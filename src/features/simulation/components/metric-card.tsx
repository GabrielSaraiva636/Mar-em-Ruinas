import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type MetricCardProps = {
  icon: LucideIcon;
  label: string;
  value: number;
  color: string;
};

export function MetricCard({ icon: Icon, label, value, color }: MetricCardProps) {
  return (
    <Card className="border-border/70">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={`mt-1 text-2xl font-semibold ${color}`}>{Math.round(value * 100)}%</p>
          </div>
          <span className="rounded-xl bg-muted p-3">
            <Icon className={`h-5 w-5 ${color}`} />
          </span>
        </div>
        <Progress value={value * 100} />
      </CardContent>
    </Card>
  );
}
