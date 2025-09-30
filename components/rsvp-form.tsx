"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SectionWrapper } from "./section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2, Heart } from "lucide-react"
import { rsvpSchema, type RSVPFormData } from "@/lib/rsvp-schema"
import { trackEvent } from "@/lib/analytics"

export function RSVPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: undefined,
      guestCount: 1,
      honeypot: "",
    },
  })

  const attending = watch("attending")
  const guestCount = watch("guestCount")

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to submit RSVP")
      }

      setIsSuccess(true)
      reset()
      trackEvent("rsvp_submitted", { attending: data.attending })

      toast({
        title: "Thank you!",
        description: "We've received your RSVP. We can't wait to celebrate with you!",
      })
    } catch (error) {
      console.log('test', error)
      toast({
        title: "Oops!",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <SectionWrapper id="rsvp" title="RSVP" className="bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-serif text-3xl font-bold text-foreground">Thank You!</h3>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  We've received your RSVP and can't wait to celebrate with you on our special day!
                </p>
              </div>
              <Button onClick={() => setIsSuccess(false)} variant="outline" size="lg">
                Submit Another RSVP
              </Button>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper
      id="rsvp"
      title="RSVP"
      subtitle="Please let us know if you'll be joining us for our special day"
      className="bg-muted/30"
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-serif">
              <Heart className="w-6 h-6 text-primary" />
              Reserve Your Spot
            </CardTitle>
            <CardDescription>Kindly respond by November 14, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="John Doe"
                  aria-invalid={errors.fullName ? "true" : "false"}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="text-sm text-destructive" role="alert">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+63 900 000 0000"
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-destructive" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Attending */}
              <div className="space-y-3">
                <Label>
                  Will you be attending? <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={attending}
                  onValueChange={(value) => setValue("attending", value as "yes" | "no")}
                  aria-invalid={errors.attending ? "true" : "false"}
                  aria-describedby={errors.attending ? "attending-error" : undefined}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="font-normal cursor-pointer">
                      Joyfully accepts
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="font-normal cursor-pointer">
                      Regretfully declines
                    </Label>
                  </div>
                </RadioGroup>
                {errors.attending && (
                  <p id="attending-error" className="text-sm text-destructive" role="alert">
                    {errors.attending.message}
                  </p>
                )}
              </div>

              {/* Guest Count - only show if attending */}
              {attending === "yes" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="guestCount">
                      Number of Guests <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={guestCount?.toString()}
                      onValueChange={(value) => setValue("guestCount", Number.parseInt(value))}
                    >
                      <SelectTrigger
                        id="guestCount"
                        aria-invalid={errors.guestCount ? "true" : "false"}
                        aria-describedby={errors.guestCount ? "guestCount-error" : undefined}
                      >
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.guestCount && (
                      <p id="guestCount-error" className="text-sm text-destructive" role="alert">
                        {errors.guestCount.message}
                      </p>
                    )}
                  </div>

                  {/* Plus One - only show if guest count > 1 */}
                  {guestCount > 1 && (
                    <div className="space-y-2">
                      <Label htmlFor="plusOne">Plus One Name(s)</Label>
                      <Input
                        id="plusOne"
                        {...register("plusOne")}
                        placeholder="Jane Doe"
                        aria-describedby="plusOne-help"
                      />
                      <p id="plusOne-help" className="text-sm text-muted-foreground">
                        If bringing multiple guests, separate names with commas
                      </p>
                    </div>
                  )}

                  {/* Dietary Restrictions */}
                  <div className="space-y-2">
                    <Label htmlFor="dietary">Dietary Restrictions or Allergies</Label>
                    <Textarea
                      id="dietary"
                      {...register("dietary")}
                      placeholder="Please let us know of any dietary needs..."
                      rows={3}
                    />
                  </div>
                </>
              )}

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message to the Couple (Optional)</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Share your well wishes..."
                  rows={4}
                  aria-describedby="message-help"
                />
                <p id="message-help" className="text-sm text-muted-foreground">
                  We'd love to hear from you!
                </p>
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit RSVP"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}
