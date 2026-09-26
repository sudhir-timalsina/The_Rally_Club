import { Flower2, Footprints, Users, Sparkles, Dumbbell, PartyPopper, CircleDot } from "lucide-react";
import type { EventCategory } from "@/types";

export const CATEGORY_ICONS: Record<EventCategory, typeof CircleDot> = {
  padel: CircleDot,
  pilates: Flower2,
  running: Footprints,
  social: Users,
  wellness: Sparkles,
  fitness: Dumbbell,
  special: PartyPopper,
};

export function CategoryIcon({ category, size = 15 }: { category: EventCategory; size?: number }) {
  const Icon = CATEGORY_ICONS[category] ?? CircleDot;
  return <Icon size={size} strokeWidth={1.75} />;
}
