"use client"

import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Download } from "lucide-react"
import { downloadICS } from "@/lib/add-to-calendar"

const events = [
  {
    title: "Ceremony",
    time: "3:00 PM",
    description: "Join us as we exchange our vows in an intimate garden ceremony.",
    startTime: new Date("2025-12-14T15:00:00+08:00"),
    endTime: new Date("2025-12-14T16:00:00+08:00"),
  },
  {
    title: "Reception",
    time: "5:30 PM",
    description: "Celebrate with us with dinner, dancing, and unforgettable memories.",
    startTime: new Date("2025-12-14T17:30:00+08:00"),
    endTime: new Date("2025-12-14T21:00:00+08:00"),
  },
]

const additionalInfo = [
  { time: "2:30 PM", event: "Guest Arrival & Registration" },
  { time: "3:00 PM", event: "Ceremony Begins" },
  { time: "4:00 PM", event: "Cocktail Hour" },
  { time: "5:30 PM", event: "Reception & Dinner" },
  { time: "7:00 PM", event: "First Dance" },
  { time: "9:00 PM", event: "Party & Dancing" },
]

export function Schedule() {
  const handleDownload = (event: (typeof events)[0]) => {
    downloadICS(
      {
        title: `Ken & Mia Wedding - ${event.title}`,
        description: event.description,
        location: "123 Garden Lane, Tagaytay, Cavite, Philippines",
        startTime: event.startTime,
        endTime: event.endTime,
      },
      `ken-mia-wedding-${event.title.toLowerCase()}`,
    )
  }

  return (
    <SectionWrapper id="schedule" title="Schedule" subtitle="Mark your calendars for our special day">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Main Events */}
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-serif">{event.title}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-lg">{event.time}</span>
                    </div>
                  </div>
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">{event.description}</p>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => handleDownload(event)}>
                  <Download className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dress Code */}
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Dress Code</h3>
          <Badge variant="secondary" className="text-base px-6 py-2">
            Formal Attire
          </Badge>
        </div>

        {/* Detailed Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center font-serif text-2xl">Day Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {additionalInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="text-lg font-semibold text-primary">{item.time}</span>
                  </div>
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-foreground/90">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}
