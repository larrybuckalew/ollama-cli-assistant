export default function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Ollama CLI. All rights reserved.</div>
        <nav className="flex gap-6 text-sm">
          <a href="https://github.com/larrybuckalew/ollama-cli-assistant" className="text-muted-foreground hover:text-foreground">GitHub</a>
          <a href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</a>
          <a href="/terms" className="text-muted-foreground hover:text-foreground">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
