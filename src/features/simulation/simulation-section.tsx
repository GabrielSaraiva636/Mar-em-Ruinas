import {
  BottleWine,
  Droplets,
  Fish,
  Microscope,
  Plus,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  TriangleAlert,
} from "lucide-react";
import { OceanScene } from "@/components/ocean/ocean-scene";
import { SectionHeading } from "@/components/shared/section-heading";
import { ImpactStat } from "@/components/shared/impact-stat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pollutionObjects as objectCatalog } from "@/data/objects";
import { useSimulationStore } from "@/store/simulation-store";
import { MetricCard } from "./components/metric-card";
import { EmptySelection, ObjectDetails } from "./components/object-details";

export function SimulationSection() {
  const {
    pollutionLevel,
    waterQuality,
    fishHealth,
    microplasticAmount,
    ecosystemState,
    selectedObject,
    pollutionObjects,
    addPollutionObject,
    selectObject,
    setPollution,
    reset,
  } = useSimulationStore();

  const pollutionPercentage = Math.round(pollutionLevel * 100);
  const selectedDetails = objectCatalog.find((item) => item.id === selectedObject);

  return (
    <section id="simulacao" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Laboratório"
          title="Simulação oceânica"
          description="Controle o nível de poluição e investigue os resíduos encontrados no ambiente."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_340px]">
          <Card className="overflow-hidden border-border/70 shadow-xl">
            <div className="relative min-h-[560px]">
              <OceanScene pollution={pollutionPercentage} debris />
              <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between">
                <Badge className="glass-dark border-white/10 text-white">
                  <span className="mr-2 h-2 w-2 rounded-full bg-aqua-glow" />
                  Ambiente em tempo real
                </Badge>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={reset}
                  title="Reiniciar simulação"
                  className="glass-dark border-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <RefreshCcw />
                </Button>
              </div>

              {pollutionObjects.map((item) => (
                <button
                  key={item.id}
                  onClick={() => selectObject(item.type)}
                  className="absolute z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-white/25"
                  style={{ left: `${item.x * 85 + 5}%`, top: `${item.y * 65 + 18}%` }}
                  aria-label={`Selecionar ${item.type}`}
                >
                  {item.type === "bottle" ? <BottleWine className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                </button>
              ))}

              <div className="absolute inset-x-5 bottom-5 z-20 rounded-2xl border border-white/15 bg-ocean-abyss/75 p-4 text-white shadow-2xl backdrop-blur-xl">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-white/50">Nível de poluição</p>
                    <p className="text-lg font-semibold">{pollutionPercentage}%</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/15 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                      onClick={() => addPollutionObject("bottle", Math.random(), Math.random())}
                    >
                      <Plus /> Garrafa
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/15 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                      onClick={() => addPollutionObject("bag", Math.random(), Math.random())}
                    >
                      <Plus /> Sacola
                    </Button>
                  </div>
                </div>
                <Slider
                  value={[pollutionPercentage]}
                  max={100}
                  step={1}
                  aria-label="Nível de poluição"
                  onValueChange={([value]) => setPollution(value / 100)}
                />
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <MetricCard icon={Droplets} label="Qualidade da água" value={waterQuality} color="text-primary" />
            <MetricCard icon={Fish} label="Saúde marinha" value={fishHealth} color="text-emerald-600" />
            <MetricCard icon={Microscope} label="Microplásticos" value={microplasticAmount} color="text-amber-600" />

            <Card className="border-border/70">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Estado do ecossistema</CardTitle>
                  {ecosystemState === "healthy" ? (
                    <ShieldCheck className="text-emerald-600" />
                  ) : (
                    <TriangleAlert className="text-amber-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant={ecosystemState === "healthy" ? "default" : "destructive"}>
                  {ecosystemState === "healthy" ? "Saudável" : ecosystemState === "stressed" ? "Sob pressão" : "Colapsado"}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6 border-border/70">
          <Tabs defaultValue="residuo">
            <CardHeader className="border-b">
              <TabsList className="w-full justify-start bg-muted/70">
                <TabsTrigger value="residuo">Resíduo selecionado</TabsTrigger>
                <TabsTrigger value="impacto">Impacto acumulado</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="residuo" className="mt-0">
                {selectedDetails ? <ObjectDetails item={selectedDetails} /> : <EmptySelection />}
              </TabsContent>
              <TabsContent value="impacto" className="mt-0">
                <div className="grid gap-4 sm:grid-cols-3">
                  <ImpactStat label="Água comprometida" value={`${pollutionPercentage}%`} />
                  <ImpactStat label="Perda de saúde" value={`${Math.round((1 - fishHealth) * 100)}%`} />
                  <ImpactStat label="Contaminação alimentar" value={`${Math.round(microplasticAmount * 100)}%`} />
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
}
