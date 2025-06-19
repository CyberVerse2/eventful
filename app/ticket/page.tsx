"use client"

import EventTicket from "@/components/event-ticket"
import { Button } from "@/components/ui/button"
import { Download, Printer, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TicketPage() {
  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    alert("Download functionality would be implemented here")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Event Ticket",
        text: "Check out my ticket for Summer Music Festival 2024!",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Ticket link copied to clipboard!")
    }
  }

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
        {/* Minimal Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Ticket</h1>
          <p className="text-gray-600">Ready for your event</p>
        </div>

        {/* Ticket */}
        <EventTicket />

        {/* Minimal Action Buttons */}
        <div className="max-w-lg mx-auto mt-8">
          <div className="flex gap-3 justify-center">
            <Button
              onClick={handlePrint}
              size="sm"
              className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button
              onClick={handleDownload}
              size="sm"
              variant="outline"
              className="bg-white text-black border-black hover:bg-gray-100 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Save
            </Button>
            <Button
              onClick={handleShare}
              size="sm"
              variant="outline"
              className="bg-white text-black border-black hover:bg-gray-100 flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
