"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "rounded-sm border border-line bg-bone/70 px-5 transition-colors duration-300 sm:px-7",
      "data-[state=open]:border-blush-deep/70 data-[state=open]:bg-blush/30",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-4 py-5 text-left font-display text-lg sm:py-6 sm:text-xl",
        className
      )}
      {...props}
    >
      <span className="flex items-baseline gap-4">{children}</span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-cream text-chocolate transition-all duration-300 group-hover:border-chocolate/40 group-data-[state=open]:rotate-45 group-data-[state=open]:border-chocolate group-data-[state=open]:bg-chocolate group-data-[state=open]:text-cream">
        <Plus size={16} />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-[accordion-up_0.3s_ease] data-[state=open]:animate-[accordion-down_0.3s_ease]"
    {...props}
  >
    <div className={cn("max-w-2xl pb-6 pr-10 leading-relaxed text-chocolate/70 sm:pl-8", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
