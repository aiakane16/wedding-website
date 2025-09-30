"use client"

import { SectionWrapper } from "./section-wrapper"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

const images = [
  { src: "/images/gallery-1.jpg", alt: "Ken and Mia portrait" },
  { src: "/images/gallery-2.jpg", alt: "Engagement photos" },
  { src: "/images/gallery-3.jpg", alt: "Romantic sunset" },
  { src: "/images/gallery-4.jpg", alt: "Adventure together" },
  { src: "/images/gallery-5.jpg", alt: "Candid moment" },
  { src: "/images/gallery-6.jpg", alt: "Celebration" },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <SectionWrapper id="gallery" title="Gallery" subtitle="Moments we've cherished together" className="bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          {selectedImage !== null && (
            <div className="relative w-full aspect-video">
              <Image
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  )
}
