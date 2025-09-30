"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function Hero() {
  const scrollToRSVP = () => {
    const element = document.querySelector("#rsvp")
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero.jpg" alt="Bryan and Mia" fill className="object-cover" priority quality={90} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <Heart className="w-12 h-12 mx-auto text-primary animate-pulse" />
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground text-balance">
              Bryan & Mia
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-primary" />
              <p className="text-xl sm:text-2xl md:text-3xl text-foreground/90 font-light">December 14, 2025</p>
              <div className="h-px w-12 bg-primary" />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/80">Tagaytay, Cavite, Philippines</p>
          </div>

          <div className="pt-8">
            <Button
              size="lg"
              onClick={scrollToRSVP}
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              RSVP Now
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  )
}
