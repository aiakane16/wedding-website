"use client"

import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink, Navigation } from "lucide-react"

const venueInfo = {
  name: "Garden Venue",
  address: "123 Garden Lane, Tagaytay, Cavite, Philippines",
  coordinates: {
    lat: 14.1153,
    lng: 120.9621,
  },
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=14.1153,120.9621",
}

export function Venue() {
  return (
    <SectionWrapper
      id="venue"
      title="Venue"
      subtitle="Join us at this beautiful location in Tagaytay"
      className="bg-muted/30"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Venue Details */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{venueInfo.name}</h3>
                      <p className="text-foreground/80 leading-relaxed">{venueInfo.address}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full" size="lg">
                    <a href={venueInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                    <a href={venueInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Google Maps
                    </a>
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-foreground mb-3">Getting There</h4>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Approximately 1.5 hours from Manila via SLEX</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Ample parking available on-site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Shuttle service available from select hotels</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Map */}
              <div className="relative h-[400px] md:h-full min-h-[300px] rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.5!2d${venueInfo.coordinates.lng}!3d${venueInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDA2JzU1LjEiTiAxMjDCsDU3JzQzLjYiRQ!5e0!3m2!1sen!2sph!4v1234567890`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wedding Venue Location"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}
