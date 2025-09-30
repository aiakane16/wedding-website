"use client"

import { SectionWrapper } from "./section-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Gift, CreditCard } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const registryLinks = [
  {
    name: "Amazon Registry",
    url: "https://www.amazon.com/wedding/registry",
    icon: Gift,
    description: "Browse our curated selection of home essentials",
  },
  {
    name: "Target Registry",
    url: "https://www.target.com/gift-registry",
    icon: Gift,
    description: "Find gifts for our new home together",
  },
]

const bankDetails = {
  accountName: "Ken & Mia Wedding Fund",
  bank: "Sample Bank",
  accountNumber: "1234-5678-9012",
  note: "Your presence is the greatest gift, but if you wish to give, we'd be grateful for contributions to our honeymoon fund.",
}

export function Registry() {
  const [activeTab, setActiveTab] = useState("registries")

  return (
    <SectionWrapper
      id="registry"
      title="Registry & Gifts"
      subtitle="Your presence is the greatest gift, but if you wish to celebrate with us..."
    >
      <div className="max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="registries">Gift Registries</TabsTrigger>
            <TabsTrigger value="monetary">Monetary Gifts</TabsTrigger>
          </TabsList>

          <TabsContent value="registries" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {registryLinks.map((registry, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <registry.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{registry.name}</CardTitle>
                    </div>
                    <CardDescription>{registry.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full" size="lg">
                      <a href={registry.url} target="_blank" rel="noopener noreferrer">
                        View Registry
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monetary">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Honeymoon Fund</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">{bankDetails.note}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-muted-foreground">Account Name</span>
                    <span className="font-semibold text-foreground">{bankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-muted-foreground">Bank</span>
                    <span className="font-semibold text-foreground">{bankDetails.bank}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Account Number</span>
                    <span className="font-mono font-semibold text-foreground">{bankDetails.accountNumber}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SectionWrapper>
  )
}
