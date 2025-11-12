import { convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, model = "llama3.2" }: { messages: UIMessage[]; model?: string } = await req.json()

  try {
    // Get Ollama API URL from environment or use default
    const ollamaUrl = process.env.OLLAMA_API_URL || "http://localhost:11434"

    // Prepare the request for Ollama API
    const ollamaRequest = {
      model: model,
      prompt: convertToModelMessages(messages).map(m => m.content).join('\n'),
      stream: true
    }

    // Call Ollama API
    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.OLLAMA_API_KEY ? `Bearer ${process.env.OLLAMA_API_KEY}` : undefined,
        'X-Device-Key': process.env.OLLAMA_DEVICE_KEY,
      },
      body: JSON.stringify(ollamaRequest)
    })

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`)
    }

    // Stream the response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        const reader = response.body?.getReader()

        if (!reader) {
          controller.error(new Error('No response body'))
          return
        }

        function read() {
          reader?.read().then(({ done, value }) => {
            if (done) {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'))
              controller.close()
              return
            }

            // Parse Ollama's streaming response
            try {
              const chunk = new TextDecoder().decode(value)
              const lines = chunk.split('\n').filter(line => line.trim())

              for (const line of lines) {
                try {
                  const data = JSON.parse(line)
                  if (data.response) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                      type: 'text',
                      content: data.response
                    })}\n\n`))
                  }
                } catch (e) {
                  // Skip invalid JSON lines
                }
              }
            } catch (e) {
              // Skip decode errors
            }

            read()
          }).catch(error => {
            controller.error(error)
          })
        }

        read()
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('API Error:', error)

    // Fallback to mock response if Ollama is not available
    const mockResponse = `Error connecting to Ollama API: ${error instanceof Error ? error.message : 'Unknown error'}. 

Please make sure:
1. Ollama is running locally (ollama serve)
2. The model "${model}" is installed (ollama pull ${model})
3. The API URL is correct (default: http://localhost:11434)

This is a fallback mock response for testing.`

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        const chunks = mockResponse.split(' ')
        let i = 0

        const sendChunk = () => {
          if (i < chunks.length) {
            const chunk = chunks[i] + ' '
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: 'text',
              content: chunk
            })}\n\n`))
            i++
            setTimeout(sendChunk, 50)
          } else {
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
          }
        }

        sendChunk()
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  }
}
