import { cn } from "@/lib/utils";

const WORDS = ["Play", "Connect", "Belong", "Move", "Sweat", "Play"];

export function Marquee({ className }: { className?: string }) {
  const track = [...WORDS, ...WORDS];
  return (
    <div className={cn("overflow-hidden select-none", className)}>
      <div className="flex w-max animate-marquee-x motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center shrink-0">
            {track.map((word, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="font-display italic text-4xl sm:text-5xl px-6 sm:px-8 whitespace-nowrap">
                  {word}
                </span>
                <span className="w-2 h-2 rounded-full bg-blush-deep/70 shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
