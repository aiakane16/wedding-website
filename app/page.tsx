import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { OurStory } from "@/components/our-story"
import { Schedule } from "@/components/schedule"
import { Venue } from "@/components/venue"
import { Entourage } from "@/components/entourage"
import { Gallery } from "@/components/gallery"
import { Registry } from "@/components/registry"
import { RSVPForm } from "@/components/rsvp-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <OurStory />
      <Schedule />
      <Venue />
      <Entourage />
      <Gallery />
      <Registry />
      <RSVPForm />
      <Footer />
    </main>
  )
}
