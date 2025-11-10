import { convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, model = "llama3.2" }: { messages: UIMessage[]; model?: string } = await req.json()

  const prompt = convertToModelMessages(messages)

  // For demo purposes, we're using OpenAI.
  // In production, you would connect to Ollama's API endpoint
  // Example: const response = await fetch('http://localhost:11434/api/generate', ...)

  const result = streamText({
    model: "openai/gpt-5-mini",
    prompt,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse()
}
