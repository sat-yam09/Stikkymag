import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: PageHeroProps) {
  return (
    <section className="rounded-[2.3rem] bg-[#111111] p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffd54a]">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-4xl font-display text-4xl uppercase tracking-[-0.06em] text-white sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
        {description}
      </p>
      {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
    </section>
  );
}
