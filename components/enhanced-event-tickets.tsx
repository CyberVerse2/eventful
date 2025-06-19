"use client"

import { Music, Utensils, Briefcase, Gamepad2, Camera, Heart, Calendar, Clock, MapPin, User, Hash } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface BaseTicketProps {
  eventTitle: string
  eventDate: string
  eventTime: string
  venue: string
  ticketType: string
  ticketId: string
  holderName: string
  price: number
  eventImage?: string
  barcodeData?: string
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

// Barcode Component
function Barcode({ data = "123456789012", className = "" }: { data?: string; className?: string }) {
  return (
    <div className={`bg-white p-2 rounded ${className}`}>
      <div className="flex items-center justify-center space-x-px">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className={`bg-black ${Math.random() > 0.5 ? "w-0.5" : "w-px"} h-8`}
            style={{
              height: `${Math.random() * 8 + 24}px`,
            }}
          />
        ))}
      </div>
      <p className="text-xs font-mono text-center mt-1 text-gray-600">{data}</p>
    </div>
  )
}

// Enhanced Music Concert Ticket
export function EnhancedMusicTicket({
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
  eventImage = "/placeholder.svg?height=200&width=400",
  barcodeData = "MUS2024001234VIP",
}: MusicTicketProps) {
  return (
    <div className="max-w-lg mx-auto p-4">
      <Card className="overflow-hidden bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
        <CardContent className="p-0">
          {/* Event Image Header */}
          <div className="relative h-48 overflow-hidden">
            <Image src={eventImage || "/placeholder.svg"} alt={eventTitle} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full border-2 border-black">
              <span className="text-sm font-bold">${price}</span>
            </div>

            {/* Event Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Music className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide opacity-90">
                  {genre} • {ticketType}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-1">{artist}</h2>
              <p className="text-sm opacity-90">{eventTitle}</p>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                    <p className="text-sm font-medium">{eventDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Doors / Show</p>
                    <p className="text-sm font-medium">
                      {doors} / {eventTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Venue</p>
                    <p className="text-sm font-medium">{venue}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Holder</p>
                    <p className="text-sm font-medium">{holderName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Barcode Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Ticket ID</p>
                  </div>
                  <p className="font-mono text-xs text-gray-600">{ticketId}</p>
                </div>
                <Barcode data={barcodeData} className="ml-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Enhanced Conference Ticket
export function EnhancedConferenceTicket({
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
  eventImage = "/placeholder.svg?height=200&width=400",
  barcodeData = "CONF2024001234PRO",
}: ConferenceTicketProps) {
  return (
    <div className="max-w-lg mx-auto p-4">
      <Card className="overflow-hidden bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
        <CardContent className="p-0">
          {/* Event Image Header */}
          <div className="relative h-48 overflow-hidden">
            <Image src={eventImage || "/placeholder.svg"} alt={eventTitle} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full border-2 border-black">
              <span className="text-sm font-bold">${price}</span>
            </div>

            {/* Event Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide opacity-90">Conference • {ticketType}</span>
              </div>
              <h2 className="text-lg font-bold leading-tight">{eventTitle}</h2>
            </div>
          </div>

          {/* Attendee Badge */}
          <div className="bg-slate-50 p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Attendee</p>
                <p className="font-semibold text-gray-900">{holderName}</p>
                <p className="text-sm text-gray-600">
                  {role} • {company}
                </p>
              </div>
              {networkingAccess && (
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded border border-green-200">
                  Networking Access
                </div>
              )}
            </div>
          </div>

          {/* Event Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                  <p className="text-sm font-medium">{eventDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Start Time</p>
                  <p className="text-sm font-medium">{eventTime}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-600" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Venue</p>
                <p className="text-sm font-medium">{venue}</p>
              </div>
            </div>

            {/* Barcode Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Access Code</p>
                  </div>
                  <p className="font-mono text-xs text-gray-600">{ticketId}</p>
                </div>
                <Barcode data={barcodeData} className="ml-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Enhanced Sports Ticket
export function EnhancedSportsTicket({
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
  eventImage = "/placeholder.svg?height=200&width=400",
  barcodeData = "SPT2024001234LB",
}: SportsTicketProps) {
  return (
    <div className="max-w-lg mx-auto p-4">
      <Card className="overflow-hidden bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
        <CardContent className="p-0">
          {/* Event Image Header */}
          <div className="relative h-48 overflow-hidden">
            <Image src={eventImage || "/placeholder.svg"} alt={eventTitle} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full border-2 border-black">
              <span className="text-sm font-bold">${price}</span>
            </div>

            {/* Event Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Gamepad2 className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide opacity-90">Sports • {ticketType}</span>
              </div>
              <h2 className="text-lg font-bold mb-1">{eventTitle}</h2>
              <p className="text-base font-semibold text-orange-300">{teams}</p>
            </div>
          </div>

          {/* Seat Information - Prominent */}
          <div className="bg-orange-50 p-4 border-b-2 border-orange-200">
            <div className="text-center">
              <p className="text-xs text-orange-600 uppercase tracking-wide mb-2">Your Seat</p>
              <div className="flex justify-center items-center gap-6">
                <div>
                  <p className="text-xs text-gray-500">Section</p>
                  <p className="text-lg font-bold text-gray-900">{section.replace("Section ", "")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Row</p>
                  <p className="text-lg font-bold text-gray-900">{row.replace("Row ", "")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Seat</p>
                  <p className="text-lg font-bold text-gray-900">{seat.replace("Seat ", "")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Game Date</p>
                  <p className="text-sm font-medium">{eventDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Tip-off</p>
                  <p className="text-sm font-medium">{eventTime}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Arena</p>
                  <p className="text-sm font-medium">{venue}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Holder</p>
                  <p className="text-sm font-medium">{holderName}</p>
                </div>
              </div>
            </div>

            {/* Barcode Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Entry Code</p>
                  </div>
                  <p className="font-mono text-xs text-gray-600">{ticketId}</p>
                </div>
                <Barcode data={barcodeData} className="ml-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Enhanced Food Ticket
export function EnhancedFoodTicket({
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
  eventImage = "/placeholder.svg?height=200&width=400",
  barcodeData = "FOOD2024001234TM",
}: FoodTicketProps) {
  return (
    <div className="max-w-lg mx-auto p-4">
      <Card className="overflow-hidden bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
        <CardContent className="p-0">
          {/* Event Image Header */}
          <div className="relative h-48 overflow-hidden">
            <Image src={eventImage || "/placeholder.svg"} alt={eventTitle} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full border-2 border-black">
              <span className="text-sm font-bold">${price}</span>
            </div>

            {/* Event Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Utensils className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide opacity-90">Culinary • {courseCount} Courses</span>
              </div>
              <h2 className="text-lg font-bold mb-1">{eventTitle}</h2>
              <p className="text-sm text-amber-300">with {chefName}</p>
            </div>
          </div>

          {/* Dining Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                  <p className="text-sm font-medium">{eventDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Seating</p>
                  <p className="text-sm font-medium">{eventTime}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Restaurant</p>
                  <p className="text-sm font-medium">{venue}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Guest</p>
                  <p className="text-sm font-medium">{holderName}</p>
                </div>
              </div>
            </div>

            {dietaryInfo && (
              <div className="bg-amber-50 p-3 rounded border border-amber-200">
                <p className="text-xs text-amber-700 uppercase tracking-wide mb-1">Dietary Preference</p>
                <p className="text-sm font-medium text-amber-800">{dietaryInfo}</p>
              </div>
            )}

            {/* Barcode Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Reservation Code</p>
                  </div>
                  <p className="font-mono text-xs text-gray-600">{ticketId}</p>
                </div>
                <Barcode data={barcodeData} className="ml-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Enhanced Theater Ticket
export function EnhancedTheaterTicket({
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
  eventImage = "/placeholder.svg?height=200&width=400",
  barcodeData = "THT2024001234PRM",
}: TheaterTicketProps) {
  return (
    <div className="max-w-lg mx-auto p-4">
      <Card className="overflow-hidden bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
        <CardContent className="p-0">
          {/* Event Image Header */}
          <div className="relative h-48 overflow-hidden">
            <Image src={eventImage || "/placeholder.svg"} alt={eventTitle} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full border-2 border-black">
              <span className="text-sm font-bold">${price}</span>
            </div>

            {/* Event Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide opacity-90">
                  {showType} • {act}
                </span>
              </div>
              <h2 className="text-2xl font-bold">{eventTitle}</h2>
            </div>
          </div>

          {/* Seating Information - Theater Style */}
          <div className="bg-indigo-50 p-4 border-b-2 border-indigo-200">
            <div className="text-center">
              <p className="text-xs text-indigo-600 uppercase tracking-wide mb-2">Seating</p>
              <div className="flex justify-center items-center gap-6">
                <div>
                  <p className="text-xs text-gray-500">Section</p>
                  <p className="text-lg font-bold text-gray-900">{section}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Row</p>
                  <p className="text-lg font-bold text-gray-900">{row}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Seat</p>
                  <p className="text-lg font-bold text-gray-900">{seat}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                  <p className="text-sm font-medium">{eventDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Curtain</p>
                  <p className="text-sm font-medium">{eventTime}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Theater</p>
                  <p className="text-sm font-medium">{venue}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Patron</p>
                  <p className="text-sm font-medium">{holderName}</p>
                </div>
              </div>
            </div>

            {/* Barcode Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Admission Code</p>
                  </div>
                  <p className="font-mono text-xs text-gray-600">{ticketId}</p>
                </div>
                <Barcode data={barcodeData} className="ml-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Enhanced Wedding Ticket
export function EnhancedWeddingTicket({
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
  eventImage = "/placeholder.svg?height=200&width=400",
  barcodeData = "WED2024001234GST",
}: WeddingTicketProps) {
  return (
    <div className="max-w-lg mx-auto p-4">
      <Card className="overflow-hidden bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
        <CardContent className="p-0">
          {/* Event Image Header */}
          <div className="relative h-48 overflow-hidden">
            <Image src={eventImage || "/placeholder.svg"} alt={eventTitle} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Event Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wide opacity-90">Wedding Celebration</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">{coupleNames}</h2>
              <p className="text-sm opacity-90 italic">{eventTitle}</p>
            </div>
          </div>

          {/* Wedding Schedule */}
          <div className="p-6 space-y-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date</p>
              <p className="text-lg font-medium text-gray-900">{eventDate}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="w-3 h-3 text-rose-600" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Ceremony</p>
                </div>
                <p className="text-sm font-medium">{ceremony}</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="w-3 h-3 text-rose-600" />
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Reception</p>
                </div>
                <p className="text-sm font-medium">{reception}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Venue</p>
                  <p className="text-sm font-medium">{venue}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-rose-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Guest</p>
                  <p className="text-sm font-medium">{holderName}</p>
                </div>
              </div>
            </div>

            <div className="bg-rose-50 p-3 rounded border border-rose-200 text-center">
              <p className="text-xs text-rose-600 uppercase tracking-wide mb-1">Dress Code</p>
              <p className="text-sm font-medium text-rose-800">{dresscode}</p>
            </div>

            {/* Barcode Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Guest Code</p>
                  </div>
                  <p className="font-mono text-xs text-gray-600">{ticketId}</p>
                </div>
                <Barcode data={barcodeData} className="ml-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
