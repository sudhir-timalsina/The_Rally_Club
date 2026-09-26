import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wideish transition-colors duration-300 ease-editorial disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-chocolate text-cream hover:bg-chocolate-light rounded-sm px-7 py-3.5",
        secondary:
          "bg-transparent border border-chocolate text-chocolate hover:bg-chocolate hover:text-cream rounded-sm px-7 py-3.5",
        ghost:
          "bg-transparent text-chocolate underline underline-offset-4 decoration-taupe hover:decoration-chocolate px-0 py-1",
        pink:
          "bg-blush text-chocolate hover:bg-blush-deep rounded-sm px-7 py-3.5",
        whatsapp:
          "bg-[#3D2A22] text-cream hover:bg-[#25D366] hover:text-[#0b3d20] rounded-sm px-7 py-3.5",
      },
      size: {
        default: "text-sm",
        sm: "text-xs px-5 py-2.5",
        lg: "text-base px-9 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
