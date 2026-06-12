import { ArrowDown, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { OceanScene } from "@/components/ocean/ocean-scene";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FoodChainSection } from "@/features/food-chain/food-chain-section";
import { QuizSection } from "@/features/quiz/quiz-section";
import { SimulationSection } from "@/features/simulation/simulation-section";
import { useSimulationStore } from "@/store/simulation-store";

export function HomePage() {
  const pollutionLevel = useSimulationStore((state) => state.pollutionLevel);
  const pollutionPercentage = Math.round(pollutionLevel * 100);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar variant="dark" />
      <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden">
        <OceanScene pollution={pollutionPercentage} debris={pollutionPercentage > 15} />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-abyss/90 via-ocean-abyss/50 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24">
          <Badge className="mb-6 border-white/15 bg-white/10 text-aqua-glow hover:bg-white/10">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Experiência interativa
          </Badge>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-7xl">
            O oceano muda com cada escolha.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            Simule a poluição por microplásticos e acompanhe seus efeitos na água, nos animais e na alimentação humana.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-xl bg-aqua text-ocean-abyss hover:bg-aqua-glow">
              <a href="#simulacao">Começar simulação <ArrowDown /></a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#cadeia-alimentar">Ver cadeia alimentar</a>
            </Button>
          </div>
        </div>
      </section>

      <SimulationSection />
      <FoodChainSection />
      <QuizSection />
    </main>
  );
}
