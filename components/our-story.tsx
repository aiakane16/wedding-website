import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

const timeline = [
  {
    year: "2018",
    title: "First Meeting",
    description: "We met at a mutual friend's party in Manila and instantly connected over our shared love of travel.",
  },
  {
    year: "2021",
    title: "First Adventure",
    description:
      "Our first trip together to Palawan sealed the deal. We knew we were meant to explore the world together.",
  },
  {
    year: "2024",
    title: "The Proposal",
    description: "Ken proposed at sunset on the same beach where we had our first adventure. Of course, Mia said yes!",
  },
]

export function OurStory() {
  return (
    <SectionWrapper
      id="story"
      title="Our Story"
      subtitle="Every love story is beautiful, but ours is our favorite"
      className="bg-muted/30"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="prose prose-lg max-w-none text-center space-y-6">
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
            Our journey began on a warm summer evening in 2018, when fate brought us together at a friend's gathering.
            What started as a simple conversation about our dreams and aspirations quickly blossomed into something
            extraordinary.
          </p>
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
            Through countless adventures, late-night conversations, and shared dreams, we've built a love that grows
            stronger with each passing day. Now, we're thrilled to begin our greatest adventure yet—marriage.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {timeline.map((item, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-serif font-bold text-primary">{item.year}</p>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
