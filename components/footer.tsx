"use client"

import { Heart, Instagram, Facebook, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const scrollToSection = (href: string) => {
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
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-foreground">Ken & Mia</h3>
            <p className="text-muted-foreground">December 14, 2025</p>
            <p className="text-sm text-muted-foreground">Tagaytay, Cavite, Philippines</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection("#schedule")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Schedule
              </button>
              <button
                onClick={() => scrollToSection("#venue")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Venue
              </button>
              <button
                onClick={() => scrollToSection("#registry")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Registry
              </button>
              <button
                onClick={() => scrollToSection("#rsvp")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                RSVP
              </button>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect With Us</h4>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:ken.mia.wedding@example.com" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} Ken & Mia</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>All rights reserved</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
