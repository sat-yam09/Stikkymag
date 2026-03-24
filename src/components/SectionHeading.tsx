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
          : "max-w-3xl text-left"
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#537266]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl tracking-[-0.05em] text-[#18231d] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-[#5a6662] sm:text-lg">
        {description}
      </p>
    </div>
  );
}
