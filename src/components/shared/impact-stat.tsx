type ImpactStatProps = {
  label: string;
  value: string;
};

export function ImpactStat({ label, value }: ImpactStatProps) {
  return (
    <div className="rounded-xl bg-muted p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-semibold capitalize">{value}</p>
    </div>
  );
}
