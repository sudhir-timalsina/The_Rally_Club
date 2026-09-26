import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "text-center flex flex-col items-center", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className={cn("text-display-md max-w-xl", align === "center" && "mx-auto")}>{title}</h2>
      {description && (
        <p className={cn("mt-4 text-chocolate/70 max-w-md text-[1.05rem] leading-relaxed", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
