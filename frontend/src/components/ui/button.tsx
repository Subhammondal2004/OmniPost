import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-[0_25px_75px_-35px_rgba(99,102,241,0.55)] hover:shadow-[0_24px_80px_-35px_rgba(99,102,241,0.45)] active:scale-[0.98]",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-[0_25px_75px_-35px_rgba(239,68,68,0.35)] active:scale-[0.98]",
        outline: "border-2 border-slate-200 dark:border-slate-700 bg-white/10 dark:bg-white/5 backdrop-blur-xl hover:border-indigo-300 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/10 text-slate-900 dark:text-slate-100",
        secondary: "bg-slate-100/90 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 shadow-sm",
        ghost: "bg-transparent hover:bg-slate-100/80 dark:hover:bg-slate-800/80",
        link: "text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }