// components/ui/badge.tsx
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "destructive" | "secondary" | "pending" | "warning"
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-gray-100 text-gray-800": variant === "default",
          "bg-green-100 text-green-800": variant === "success",
          "bg-red-100 text-red-800": variant === "destructive",
          "bg-blue-100 text-blue-800": variant === "secondary",
          "bg-[#f8ea6c] text-blue-800": variant === "pending",
          "bg-[#f9dc72] text-blue-800": variant === "warning",
        },
        className
      )}
      {...props}
    />
  )
}