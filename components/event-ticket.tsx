"use client"

import { Calendar, Clock, MapPin, User, Hash } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TicketProps {
  eventTitle: string
  eventDate: string
  eventTime: string
  venue: string
  ticketType: string
  ticketId: string
  holderName: string
  seatInfo?: string
  price: number
}

export default function EventTicket({
  eventTitle = "Summer Music Festival 2024",
  eventDate = "July 15, 2024",
  eventTime = "6:00 PM",
  venue = "Central Park, New York",
  ticketType = "VIP",
  ticketId = "EVT-2024-VIP-001234",
  holderName = "John Doe",
  seatInfo = "Section A, Row 5, Seat 12",
  price = 150,
}: TicketProps) {
  return (
    <div className="max-w-lg mx-auto p-4">
      <Card className="overflow-hidden bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-yellow-400 px-8 py-6 border-b-2 border-black">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-black">Eventful</h1>
                <p className="text-xs text-black/70 uppercase tracking-wider">Event Ticket</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-black">${price}</p>
                <p className="text-xs text-black/70 uppercase tracking-wider">{ticketType}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 space-y-8">
            {/* Event Title */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{eventTitle}</h2>
            </div>

            {/* Thin Divider */}
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date</p>
                    <p className="text-sm font-medium text-gray-900">{eventDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Time</p>
                    <p className="text-sm font-medium text-gray-900">{eventTime}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Venue</p>
                    <p className="text-sm font-medium text-gray-900">{venue}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Holder</p>
                    <p className="text-sm font-medium text-gray-900">{holderName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Information */}
            {seatInfo && (
              <>
                <div className="w-16 h-px bg-gray-300 mx-auto"></div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Seat</p>
                  <p className="text-lg font-medium text-gray-900">{seatInfo}</p>
                </div>
              </>
            )}

            {/* Ticket ID */}
            <div className="text-center">
              <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Hash className="w-3 h-3 text-gray-400" />
                <p className="text-xs text-gray-500 uppercase tracking-wide">Ticket ID</p>
              </div>
              <p className="font-mono text-xs text-gray-600 tracking-wider">{ticketId}</p>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center">
              <div className="w-16 h-16 border-2 border-gray-200 rounded flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-100 rounded grid grid-cols-3 gap-px p-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className={`bg-gray-800 rounded-sm ${Math.random() > 0.5 ? "opacity-100" : "opacity-30"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Valid for single entry</span>
              <span className="font-medium">eventful.com</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Minimal Instructions */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">Present this ticket at venue entrance</p>
      </div>
    </div>
  )
}
