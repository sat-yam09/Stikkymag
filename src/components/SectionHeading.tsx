type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-4xl text-left"
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#6a6a6a]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-4xl tracking-[-0.06em] text-[#111111] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-8 text-[#585858] sm:text-lg">
        {description}
      </p>
    </div>
  );
}
