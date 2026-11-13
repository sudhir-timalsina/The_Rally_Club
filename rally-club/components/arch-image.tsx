import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Arch-shaped photo (rounded top, soft square bottom) with an offset colour
 * block behind it — echoes the arched panel in the Rally brand moodboard.
 */
export function ArchImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 1024px) 80vw, 40vw",
  tone = "blush",
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  tone?: "blush" | "beige";
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-sm lg:max-w-none", className)}>
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-sm",
          tone === "blush" ? "bg-blush" : "bg-beige"
        )}
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-sm bg-beige">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
