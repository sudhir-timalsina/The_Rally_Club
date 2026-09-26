import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoBadge({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <div
      className={cn("relative shrink-0 rounded-full overflow-hidden", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/logo-badge.jpg"
        alt="The Rally Club"
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
    </div>
  );
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col leading-none", className)}>
      <span className="text-[0.62rem] tracking-label uppercase text-taupe-dark">The</span>
      <span className="font-display text-xl tracking-tight -mt-0.5">Rally</span>
      <span className="text-[0.62rem] tracking-label uppercase text-taupe-dark -mt-0.5">Club</span>
    </div>
  );
}

export function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="The Rally Club — Home">
      <LogoBadge size={42} />
      <LogoWordmark />
    </Link>
  );
}
