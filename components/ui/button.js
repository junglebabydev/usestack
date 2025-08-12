import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils.js"

// Added back the buttonVariants definition that was accidentally removed
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

/**
 * Button component props
 * @typedef {Object} ButtonProps
 * @property {string} [className] - Additional CSS classes
 * @property {'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'} [variant] - Button variant style
 * @property {'default'|'sm'|'lg'|'icon'} [size] - Button size
 * @property {boolean} [asChild] - Whether to render as child component using Slot
 * @property {React.Ref<HTMLButtonElement>} [ref] - Button element ref
 */

/**
 * Versatile button component with multiple variants and sizes
 * @param {ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} props - Button props
 * @param {React.Ref<HTMLButtonElement>} ref - Button element ref
 * @returns {React.ReactElement} Button component
 */
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

// Added buttonVariants back to the exports
export { Button, buttonVariants }
