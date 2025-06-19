"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
  MusicTicket,
  ConferenceTicket,
  SportsTicket,
  FoodTicket,
  TheaterTicket,
  WeddingTicket,
} from "@/components/event-ticket-variants"

const ticketTypes = [
  { id: "music", name: "Music Concert", component: MusicTicket },
  { id: "conference", name: "Business Conference", component: ConferenceTicket },
  { id: "sports", name: "Sports Event", component: SportsTicket },
  { id: "food", name: "Fine Dining", component: FoodTicket },
  { id: "theater", name: "Theater Show", component: TheaterTicket },
  { id: "wedding", name: "Wedding", component: WeddingTicket },
]

export default function TicketVariantsPage() {
  const [selectedType, setSelectedType] = useState("music")
  const SelectedTicketComponent = ticketTypes.find((type) => type.id === selectedType)?.component || MusicTicket

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200">
      {/* Navigation Bar */}
      <nav className="bg-white border-b-4 border-black shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-black">Eventful</h1>
              <div className="w-2 h-2 bg-yellow-500 rounded-full ml-2"></div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors">
                Events
              </a>
              <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-black font-medium transition-colors">
                Contact
              </a>
              <Button variant="outline" className="bg-black text-white border-black hover:bg-gray-800">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ticket Design Variants</h1>
          <p className="text-gray-600">Minimalistic layouts tailored for different event types</p>
        </div>

        {/* Ticket Type Selector */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {ticketTypes.map((type) => (
              <Button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                variant={selectedType === type.id ? "default" : "outline"}
                size="sm"
                className={
                  selectedType === type.id
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white text-black border-black hover:bg-gray-100"
                }
              >
                {type.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Ticket */}
        <div className="mb-8">
          <SelectedTicketComponent />
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Button>
          </Link>
        </div>

        {/* Design Features */}
        <div className="max-w-4xl mx-auto mt-16 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Design Features by Event Type</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">Music Concert</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Purple gradient theme</li>
                <li>• Artist prominence</li>
                <li>• Genre classification</li>
                <li>• Doors vs show time</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-slate-600">Business Conference</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Professional dark theme</li>
                <li>• Company & role details</li>
                <li>• Networking access badge</li>
                <li>• Clean corporate layout</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Sports Event</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Orange/red energy theme</li>
                <li>• Prominent seat details</li>
                <li>• Team matchup focus</li>
                <li>• Clear section layout</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-amber-600">Fine Dining</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Warm amber theme</li>
                <li>• Chef & course count</li>
                <li>• Dietary preferences</li>
                <li>• Elegant typography</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-indigo-600">Theater Show</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Indigo/purple arts theme</li>
                <li>• Traditional seat layout</li>
                <li>• Show type & act info</li>
                <li>• Curtain time emphasis</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-rose-600">Wedding</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Romantic rose theme</li>
                <li>• Couple names prominence</li>
                <li>• Ceremony & reception times</li>
                <li>• Dress code information</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
