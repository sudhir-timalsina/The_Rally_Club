import Image from "next/image";
import { Instagram } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const GRID_IMAGES = [
  "/images/crop_women_walking_padel.jpg",
  "/images/crop_wine_glasses_dinner.jpg",
  "/images/crop_sunset_women_toast.jpg",
  "/images/crop_pilates_studio.jpg",
  "/images/crop_women_coffee_table.jpg",
  "/images/crop_padel_racket_flatlay.jpg",
];

export function InstagramGrid() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {GRID_IMAGES.map((src, i) => (
          <a
            key={src}
            href={siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group bg-beige"
          >
            <Image
              src={src}
              alt="The Rally Club on Instagram"
              fill
              sizes="(max-width: 768px) 33vw, 220px"
              className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-chocolate/0 group-hover:bg-chocolate/25 transition-colors flex items-center justify-center">
              <Instagram
                size={20}
                className="text-cream opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
