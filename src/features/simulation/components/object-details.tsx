import { CircleGauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImpactStat } from "@/components/shared/impact-stat";
import type { PollutionObjectDetails } from "@/types/simulation";

export function ObjectDetails({ item }: { item: PollutionObjectDetails }) {
  return (
    <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
      <div>
        <Badge variant="secondary">Resíduo identificado</Badge>
        <h3 className="mt-3 text-2xl font-semibold">{item.name}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.impact}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ImpactStat label="Tempo de decomposição" value={item.decomposition} />
        <ImpactStat label="Microplásticos liberados" value={item.microplastics} />
        <div className="rounded-xl bg-muted p-4 sm:col-span-2">
          <p className="text-xs font-medium text-muted-foreground">Soluções</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.solutions.map((solution) => (
              <Badge key={solution} variant="outline">{solution}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptySelection() {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center text-center">
      <CircleGauge className="h-8 w-8 text-primary" />
      <p className="mt-3 font-medium">Nenhum resíduo selecionado</p>
      <p className="mt-1 text-sm text-muted-foreground">Adicione e selecione um objeto na simulação.</p>
    </div>
  );
}
