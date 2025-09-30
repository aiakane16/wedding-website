import type * as React from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  id: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export function SectionWrapper({ id, title, subtitle, children, className, containerClassName }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16 space-y-4">
            {title && (
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
