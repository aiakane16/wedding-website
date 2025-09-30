import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Suspense } from "react"

import { Playfair_Display, Inter, Libre_Baskerville as V0_Font_Libre_Baskerville, IBM_Plex_Mono as V0_Font_IBM_Plex_Mono, Lora as V0_Font_Lora } from 'next/font/google'

// Initialize fonts
const fontLibreBaskerville = V0_Font_Libre_Baskerville({ weight: ["400","700"], subsets: ["latin"] })
const fontIBM_Plex_Mono = V0_Font_IBM_Plex_Mono({ weight: ["100","200","300","400","500","600","700"], subsets: ["latin"] })
const fontLora = V0_Font_Lora({ weight: ["400","500","600","700"], subsets: ["latin"] })

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ken & Mia | December 14, 2025",
  description: "Join us as we celebrate our wedding in Tagaytay, Cavite, Philippines",
  generator: "v0.app",
  openGraph: {
    title: "Ken & Mia | December 14, 2025",
    description: "Join us as we celebrate our wedding in Tagaytay, Cavite, Philippines",
    type: "website",
    images: ["/og.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Ken & Mia Wedding",
              startDate: "2025-12-14T15:00:00+08:00",
              endDate: "2025-12-14T21:00:00+08:00",
              location: {
                "@type": "Place",
                name: "Garden Venue",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "123 Garden Lane",
                  addressLocality: "Tagaytay",
                  addressRegion: "Cavite",
                  addressCountry: "PH",
                },
              },
              description: "Join us as we celebrate our wedding",
            }),
          }}
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
            <Toaster />
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
