import { z } from "zod"

export const rsvpSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .regex(/^\+?\d[\d\s-]{7,}$/, "Please enter a valid phone number")
      .optional()
      .or(z.literal("")),
    attending: z.enum(["yes", "no"], {
      required_error: "Please let us know if you'll be attending",
    }),
    guestCount: z.coerce.number().min(1, "At least 1 guest required").max(5, "Maximum 5 guests allowed"),
    plusOne: z.string().max(100, "Name is too long").optional().or(z.literal("")),
    dietary: z.string().max(500, "Message is too long").optional().or(z.literal("")),
    message: z.string().max(1000, "Message is too long").optional().or(z.literal("")),
    honeypot: z.string().max(0, "Invalid submission").optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      // If not attending, guest count should be 0 or 1
      if (data.attending === "no") {
        return true
      }
      // If attending, guest count must be at least 1
      return data.guestCount >= 1
    },
    {
      message: "Please specify number of guests",
      path: ["guestCount"],
    },
  )

export type RSVPFormData = z.infer<typeof rsvpSchema>
