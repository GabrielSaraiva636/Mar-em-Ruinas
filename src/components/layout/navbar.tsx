import { Waves } from "lucide-react";

const links = [
  { to: "#inicio", label: "Início" },
  { to: "#simulacao", label: "Simulação" },
  { to: "#cadeia-alimentar", label: "Cadeia Alimentar" },
  { to: "#quiz", label: "Quiz" },
] as const;

export function Navbar({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 pt-5">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 ${
          isDark ? "glass-dark text-white" : "glass text-foreground"
        }`}
      >
        <a href="#inicio" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-xl ${
              isDark ? "bg-white/15" : "bg-primary/10"
            }`}
          >
            <Waves className={`h-4 w-4 ${isDark ? "text-aqua-glow" : "text-primary"}`} />
          </span>
          <span className="text-[15px]">Mar em Ruínas</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <a
                href={l.to}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isDark ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#simulacao"
          className={`text-sm font-medium px-4 py-2 rounded-xl transition-all ${
            isDark
              ? "bg-aqua text-ocean-abyss hover:bg-aqua-glow"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          Iniciar
        </a>
      </nav>
    </header>
  );
}
