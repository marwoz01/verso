import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent font-semibold whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-raised hover:bg-accent hover:text-accent-foreground hover:-translate-y-px hover:shadow-raised-hover active:translate-y-0 active:shadow-pressed",
        outline:
          "border-input bg-card text-foreground shadow-raised hover:border-accent hover:bg-accent hover:text-accent-foreground hover:-translate-y-px hover:shadow-raised-hover active:translate-y-0 active:shadow-pressed",
        marker:
          "border-marker bg-card text-marker shadow-raised hover:border-accent hover:bg-accent hover:text-accent-foreground hover:-translate-y-px hover:shadow-raised-hover active:translate-y-0 active:shadow-pressed",
        ghost:
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 gap-1.5 px-3 text-xs has-[>svg:first-child]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        default:
          "h-9 gap-2 px-4 text-sm has-[>svg:first-child]:pl-3 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 gap-2 px-5 text-sm has-[>svg:first-child]:pl-3.5 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
