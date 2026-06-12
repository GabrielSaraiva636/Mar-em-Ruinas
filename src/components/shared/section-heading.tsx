type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-4 leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}
