import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSimulationStore } from "@/store/simulation-store";

const foodChainLevels = ["Plâncton", "Peixe pequeno", "Predador", "Ser humano"];

export function FoodChainSection() {
  const microplasticAmount = useSimulationStore((state) => state.microplasticAmount);

  return (
    <section id="cadeia-alimentar" className="bg-muted/50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Bioacumulação"
          title="A poluição percorre toda a cadeia"
          description="Os fragmentos ingeridos por organismos menores se concentram nos níveis seguintes."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {foodChainLevels.map((level, index) => {
            const contamination = Math.min(100, Math.round(microplasticAmount * 100 * (1 + index * 0.3)));

            return (
              <Card key={level} className="relative overflow-hidden border-border/70">
                <CardHeader>
                  <Badge variant="outline" className="w-fit">Nível {index + 1}</Badge>
                  <CardTitle className="pt-3">{level}</CardTitle>
                  <CardDescription>Contaminação estimada</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-3xl font-semibold text-primary">{contamination}%</p>
                  <Progress value={contamination} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
