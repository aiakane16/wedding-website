import { type NextRequest, NextResponse } from "next/server"
import { rsvpSchema } from "@/lib/rsvp-schema"
import { z } from "zod"

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate with zod schema
    const validatedData = rsvpSchema.parse(body)

    // Check honeypot field - if filled, it's likely a bot
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      return NextResponse.json({ ok: false, message: "Invalid submission" }, { status: 400 })
    }

    // Prepare data for webhook
    const webhookData = {
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone || "N/A",
      attending: validatedData.attending === "yes" ? "Yes" : "No",
      guestCount: validatedData.attending === "yes" ? validatedData.guestCount : 0,
      plusOne: validatedData.plusOne || "N/A",
      dietary: validatedData.dietary || "None",
      message: validatedData.message || "No message",
      submittedAt: new Date().toISOString(),
    }

    // Forward to webhook if configured
    const webhookUrl = process.env.RSVP_WEBHOOK_URL
    const webhookSecret = process.env.RSVP_WEBHOOK_SECRET
    const payload = webhookSecret ? { ...webhookData, secret: webhookSecret } : webhookData

    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(webhookSecret ? { "x-webhook-secret": webhookSecret } : {}),
          },
          body: JSON.stringify(payload),
        })

        if (!webhookResponse.ok) {
          console.error("[RSVP API] Webhook failed:", await webhookResponse.text())
          // Don't fail the request if webhook fails - still return success to user
        }
      } catch (webhookError) {
        console.error("[RSVP API] Webhook error:", webhookError)
        // Continue even if webhook fails
      }
    } else {
      // Development mode - just log the data
      console.log("[RSVP API] No webhook configured. RSVP data:", webhookData)
    }

    // Return success response
    return NextResponse.json(
      {
        ok: true,
        message: "RSVP submitted successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    // Handle other errors
    console.error("[RSVP API] Error:", error)
    return NextResponse.json(
      {
        ok: false,
        message: "An error occurred while processing your RSVP",
      },
      { status: 500 },
    )
  }
}
