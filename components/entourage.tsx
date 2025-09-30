import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const entourage = [
  { name: "Marcus Chen", role: "Best Man", initials: "MC" },
  { name: "Sofia Rodriguez", role: "Maid of Honor", initials: "SR" },
  { name: "James Wilson", role: "Groomsman", initials: "JW" },
  { name: "Emma Thompson", role: "Bridesmaid", initials: "ET" },
  { name: "David Park", role: "Groomsman", initials: "DP" },
  { name: "Olivia Martinez", role: "Bridesmaid", initials: "OM" },
  { name: "Ryan Foster", role: "Groomsman", initials: "RF" },
  { name: "Isabella Santos", role: "Bridesmaid", initials: "IS" },
  { name: "Lucas Anderson", role: "Usher", initials: "LA" },
  { name: "Sophia Lee", role: "Usher", initials: "SL" },
  { name: "Nathan Cruz", role: "Ring Bearer", initials: "NC" },
  { name: "Lily Reyes", role: "Flower Girl", initials: "LR" },
]

export function Entourage() {
  return (
    <SectionWrapper
      id="entourage"
      title="Our Entourage"
      subtitle="The wonderful people standing by our side on our special day"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {entourage.map((person, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Avatar className="w-20 h-20 md:w-24 md:h-24">
                  <AvatarFallback className="text-lg md:text-xl font-semibold bg-primary/10 text-primary">
                    {person.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground text-lg">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
