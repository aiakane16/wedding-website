// Placeholder for analytics integration
// Add Vercel Analytics, Google Analytics, or other tracking here

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Implementation placeholder
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, properties)
  }
}
