export interface CalendarEvent {
  title: string
  description: string
  location: string
  startTime: Date
  endTime: Date
}

export function generateICS(event: CalendarEvent): string {
  const formatDate = (date: Date): string => {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")
  }

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ken & Mia Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${formatDate(event.startTime)}`,
    `DTEND:${formatDate(event.endTime)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  return icsContent
}

export function downloadICS(event: CalendarEvent, filename: string): void {
  const icsContent = generateICS(event)
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `${filename}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
