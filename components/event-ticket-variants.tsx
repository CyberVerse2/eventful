"use client"

import { Music, Utensils, Briefcase, Gamepad2, Camera, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface BaseTicketProps {
  eventTitle: string
  eventDate: string
  eventTime: string
  venue: string
  ticketType: string
  ticketId: string
  holderName: string
  price: number
}

interface MusicTicketProps extends BaseTicketProps {
  artist: string
  genre: string
  doors: string
}

interface ConferenceTicketProps extends BaseTicketProps {
  company: string
  role: string
  networkingAccess: boolean
}

interface SportsTicketProps extends BaseTicketProps {
  teams: string
  section: string
  row: string
  seat: string
}

interface FoodTicketProps extends BaseTicketProps {
  chefName: string
  courseCount: number
  dietaryInfo?: string
}

interface TheaterTicketProps extends BaseTicketProps {
  showType: string
  act: string
  section: string
  row: string
  seat: string
}

interface WeddingTicketProps extends BaseTicketProps {
  coupleNames: string
  ceremony: string
  reception: string
  dresscode: string
}

// Music Concert Ticket
export function MusicTicket({
  eventTitle = "Summer Music Festival 2024",
  artist = "The Electric Waves",
  genre = "Electronic",
  eventDate = "July 15, 2024",
  eventTime = "8:00 PM",
  doors = "7:00 PM",
  venue = "Madison Square Garden",
  ticketType = "VIP",
  ticketId = "MUS-2024-001234",
  holderName = "John Doe",
  price = 150,
}: MusicTicketProps) {
  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-0">
          {/* Header with Music Theme */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-5 border-b-2 border-black">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                <div>
                  <h1 className="text-sm font-bold">Eventful</h1>
                  <p className="text-xs opacity-80">Concert Ticket</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${price}</p>
                <p className="text-xs opacity-80">{ticketType}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Artist & Event */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{artist}</h2>
              <p className="text-sm text-purple-600 font-medium">{eventTitle}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">{genre}</p>
            </div>

            <div className="w-12 h-px bg-purple-200 mx-auto"></div>

            {/* Event Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Date</span>
                <span className="text-sm font-medium">{eventDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Doors</span>
                <span className="text-sm font-medium">{doors}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Show</span>
                <span className="text-sm font-medium">{eventTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Venue</span>
                <span className="text-sm font-medium">{venue}</span>
              </div>
            </div>

            <div className="w-12 h-px bg-purple-200 mx-auto"></div>

            {/* Holder & ID */}
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">{holderName}</p>
              <p className="font-mono text-xs text-gray-500">{ticketId}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Business Conference Ticket
export function ConferenceTicket({
  eventTitle = "Tech Innovation Summit 2024",
  company = "TechCorp Inc.",
  role = "Software Engineer",
  eventDate = "September 20, 2024",
  eventTime = "9:00 AM",
  venue = "Convention Center",
  ticketType = "Professional",
  ticketId = "CONF-2024-001234",
  holderName = "Jane Smith",
  networkingAccess = true,
  price = 299,
}: ConferenceTicketProps) {
  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="overflow-hidden bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-0">
          {/* Professional Header */}
          <div className="bg-slate-900 px-6 py-5 border-b-2 border-black">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                <div>
                  <h1 className="text-sm font-bold">Eventful</h1>
                  <p className="text-xs opacity-80">Conference Pass</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${price}</p>
                <p className="text-xs opacity-80">{ticketType}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Event Title */}
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-900 leading-tight">{eventTitle}</h2>
            </div>

            <div className="w-16 h-px bg-gray-200 mx-auto"></div>

            {/* Attendee Info */}
            <div className="bg-gray-50 p-4 rounded border">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">Attendee</span>
                  <span className="text-sm font-medium">{holderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">Company</span>
                  <span className="text-sm font-medium">{company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 uppercase">Role</span>
                  <span className="text-sm font-medium">{role}</span>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Date</p>
                <p className="text-sm font-medium">{eventDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">Time</p>
                <p className="text-sm font-medium">{eventTime}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase mb-1">Venue</p>
              <p className="text-sm font-medium">{venue}</p>
            </div>

            {networkingAccess && (
              <div className="text-center">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Networking Access Included
                </span>
              </div>
            )}

            <div className="text-center">
              <p className="font-mono text-xs text-gray-500">{ticketId}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sports Event Ticket
export function SportsTicket({
  eventTitle = "Championship Finals",
  teams = "Lakers vs Warriors",
  eventDate = "June 15, 2024",
  eventTime = "7:30 PM",
  venue = "Crypto.com Arena",
  section = "Section 101",
  row = "Row 15",
  seat = "Seat 8",
  ticketType = "Lower Bowl",
  ticketId = "SPT-2024-001234",
  holderName = "Mike Johnson",
  price = 250,
}: SportsTicketProps) {
  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-0">
          {/* Sports Header */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-5 border-b-2 border-black">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5" />
                <div>
                  <h1 className="text-sm font-bold">Eventful</h1>
                  <p className="text-xs opacity-80">Sports Ticket</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${price}</p>
                <p className="text-xs opacity-80">{ticketType}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Game Info */}
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-900 mb-1">{eventTitle}</h2>
              <p className="text-base font-semibold text-orange-600">{teams}</p>
            </div>

            <div className="w-12 h-px bg-orange-200 mx-auto"></div>

            {/* Seat Information - Prominent */}
            <div className="bg-orange-50 p-4 rounded border-2 border-orange-200 text-center">
              <p className="text-xs text-orange-600 uppercase tracking-wide mb-2">Your Seat</p>
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-900">{section}</p>
                <p className="text-sm font-bold text-gray-900">
                  {row} • {seat}
                </p>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase mb-1">Date</p>
                <p className="text-sm font-medium">{eventDate}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase mb-1">Time</p>
                <p className="text-sm font-medium">{eventTime}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase mb-1">Venue</p>
              <p className="text-sm font-medium">{venue}</p>
            </div>

            <div className="w-12 h-px bg-orange-200 mx-auto"></div>

            <div className="text-center space-y-1">
              <p className="text-sm font-medium">{holderName}</p>
              <p className="font-mono text-xs text-gray-500">{ticketId}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Fine Dining Event Ticket
export function FoodTicket({
  eventTitle = "Chef's Table Experience",
  chefName = "Chef Marcus Williams",
  courseCount = 7,
  eventDate = "August 12, 2024",
  eventTime = "7:00 PM",
  venue = "Le Bernardin",
  ticketType = "Tasting Menu",
  ticketId = "FOOD-2024-001234",
  holderName = "Sarah Chen",
  dietaryInfo = "Vegetarian",
  price = 185,
}: FoodTicketProps) {
  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-0">
          {/* Culinary Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-5 border-b-2 border-black">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5" />
                <div>
                  <h1 className="text-sm font-bold">Eventful</h1>
                  <p className="text-xs opacity-80">Dining Experience</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${price}</p>
                <p className="text-xs opacity-80">{ticketType}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Event & Chef */}
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-900 mb-1">{eventTitle}</h2>
              <p className="text-sm text-amber-600 font-medium">with {chefName}</p>
              <p className="text-xs text-gray-500 mt-1">{courseCount}-Course Tasting Menu</p>
            </div>

            <div className="w-12 h-px bg-amber-200 mx-auto"></div>

            {/* Dining Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase">Date</span>
                <span className="text-sm font-medium">{eventDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase">Time</span>
                <span className="text-sm font-medium">{eventTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase">Restaurant</span>
                <span className="text-sm font-medium">{venue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase">Guest</span>
                <span className="text-sm font-medium">{holderName}</span>
              </div>
            </div>

            {dietaryInfo && (
              <div className="bg-amber-50 p-3 rounded border border-amber-200 text-center">
                <p className="text-xs text-amber-700 uppercase tracking-wide mb-1">Dietary Preference</p>
                <p className="text-sm font-medium text-amber-800">{dietaryInfo}</p>
              </div>
            )}

            <div className="text-center">
              <p className="font-mono text-xs text-gray-500">{ticketId}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Theater/Show Ticket
export function TheaterTicket({
  eventTitle = "Hamilton",
  showType = "Musical",
  act = "Evening Performance",
  eventDate = "October 5, 2024",
  eventTime = "8:00 PM",
  venue = "Richard Rodgers Theatre",
  section = "Orchestra",
  row = "H",
  seat = "15",
  ticketType = "Premium",
  ticketId = "THT-2024-001234",
  holderName = "Emma Wilson",
  price = 175,
}: TheaterTicketProps) {
  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-0">
          {/* Theater Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 border-b-2 border-black">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                <div>
                  <h1 className="text-sm font-bold">Eventful</h1>
                  <p className="text-xs opacity-80">Theater Ticket</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${price}</p>
                <p className="text-xs opacity-80">{ticketType}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Show Info */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{eventTitle}</h2>
              <p className="text-sm text-indigo-600 font-medium">
                {showType} • {act}
              </p>
            </div>

            <div className="w-12 h-px bg-indigo-200 mx-auto"></div>

            {/* Seating - Theater Style */}
            <div className="bg-indigo-50 p-4 rounded border-2 border-indigo-200">
              <div className="text-center">
                <p className="text-xs text-indigo-600 uppercase tracking-wide mb-2">Seating</p>
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Section</p>
                    <p className="text-sm font-bold">{section}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Row</p>
                    <p className="text-sm font-bold">{row}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Seat</p>
                    <p className="text-sm font-bold">{seat}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase mb-1">Date</p>
                <p className="text-sm font-medium">{eventDate}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase mb-1">Curtain</p>
                <p className="text-sm font-medium">{eventTime}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase mb-1">Theater</p>
              <p className="text-sm font-medium">{venue}</p>
            </div>

            <div className="w-12 h-px bg-indigo-200 mx-auto"></div>

            <div className="text-center space-y-1">
              <p className="text-sm font-medium">{holderName}</p>
              <p className="font-mono text-xs text-gray-500">{ticketId}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Wedding Invitation Ticket
export function WeddingTicket({
  eventTitle = "Wedding Celebration",
  coupleNames = "Sarah & Michael",
  ceremony = "4:00 PM",
  reception = "6:00 PM",
  eventDate = "June 20, 2024",
  venue = "Garden Estate",
  dresscode = "Cocktail Attire",
  ticketType = "Guest",
  ticketId = "WED-2024-001234",
  holderName = "Alex Thompson",
  price = 0,
}: WeddingTicketProps) {
  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-0">
          {/* Wedding Header */}
          <div className="bg-gradient-to-r from-rose-400 to-pink-400 px-6 py-5 border-b-2 border-black">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <div>
                  <h1 className="text-sm font-bold">Eventful</h1>
                  <p className="text-xs opacity-80">Wedding Invitation</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{ticketType}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Couple Names */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{coupleNames}</h2>
              <p className="text-sm text-rose-600 font-medium italic">{eventTitle}</p>
            </div>

            <div className="w-16 h-px bg-rose-200 mx-auto"></div>

            {/* Wedding Schedule */}
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date</p>
                <p className="text-lg font-medium text-gray-900">{eventDate}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase mb-1">Ceremony</p>
                  <p className="text-sm font-medium">{ceremony}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase mb-1">Reception</p>
                  <p className="text-sm font-medium">{reception}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase mb-1">Venue</p>
                <p className="text-sm font-medium">{venue}</p>
              </div>
            </div>

            <div className="bg-rose-50 p-3 rounded border border-rose-200 text-center">
              <p className="text-xs text-rose-600 uppercase tracking-wide mb-1">Dress Code</p>
              <p className="text-sm font-medium text-rose-800">{dresscode}</p>
            </div>

            <div className="w-12 h-px bg-rose-200 mx-auto"></div>

            <div className="text-center space-y-1">
              <p className="text-sm font-medium">{holderName}</p>
              <p className="font-mono text-xs text-gray-500">{ticketId}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
