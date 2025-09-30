"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/lib/theme-toggle"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Our Story", href: "#story" },
  { label: "Schedule", href: "#schedule" },
  { label: "Venue", href: "#venue" },
  { label: "Entourage", href: "#entourage" },
  { label: "Gallery", href: "#gallery" },
  { label: "Registry", href: "#registry" },
  { label: "RSVP", href: "#rsvp" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
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
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={() => scrollToSection("#hero")}
              className="font-serif text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              K & M
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-card border-b shadow-lg">
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-lg font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
