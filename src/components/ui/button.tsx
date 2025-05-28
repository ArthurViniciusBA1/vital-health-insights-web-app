import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "h-12 rounded-full flex items-center justify-center gap-2.5 text-white text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        success: "bg-green-500 hover:bg-green-600",
        destructive: "bg-red-500 hover:bg-red-600",
        outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
        link: "bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        sm: "h-10 px-4",
        lg: "h-14 px-6 text-base",
        icon: "p-3 w-12 h-12 justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
