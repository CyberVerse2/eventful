'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Printer, Share2 } from 'lucide-react';
import Link from 'next/link';
import {
  EnhancedMusicTicket,
  EnhancedConferenceTicket,
  EnhancedSportsTicket,
  EnhancedFoodTicket,
  EnhancedTheaterTicket,
  EnhancedWeddingTicket
} from '@/components/enhanced-event-tickets';

const enhancedTicketTypes = [
  { id: 'music', name: 'Music Concert', component: EnhancedMusicTicket },
  { id: 'conference', name: 'Business Conference', component: EnhancedConferenceTicket },
  { id: 'sports', name: 'Sports Event', component: EnhancedSportsTicket },
  { id: 'food', name: 'Fine Dining', component: EnhancedFoodTicket },
  { id: 'theater', name: 'Theater Show', component: EnhancedTheaterTicket },
  { id: 'wedding', name: 'Wedding', component: EnhancedWeddingTicket }
];

export default function EnhancedTicketsPage() {
  const [selectedType, setSelectedType] = useState('music');
  const SelectedTicketComponent =
    enhancedTicketTypes.find((type) => type.id === selectedType)?.component || EnhancedMusicTicket;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Download functionality would be implemented here');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Event Ticket',
        text: 'Check out my enhanced event ticket!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ticket link copied to clipboard!');
    }
  };

  const defaultTicketProps = {
    artist: 'Sample Artist',
    genre: 'Pop',
    doors: '6:00 PM',
    eventTitle: 'Sample Event',
    date: '2024-07-15',
    time: '7:00 PM',
    location: 'Sample Venue',
    price: 99,
    ticketClass: 'VIP',
    barcode: '1234567890',
    ticketId: 'TICKET-001',
    holderName: 'John Doe',
    company: 'Sample Company',
    role: 'Attendee',
    networkingAccess: true,
    eventDate: '2024-07-15',
    eventTime: '7:00 PM',
    venue: 'Sample Venue',
    ticketType: 'VIP',
    teams: 'Team A vs Team B',
    section: 'A',
    row: '1',
    seat: '10',
    chefName: 'Chef Example',
    courseCount: 5,
    showType: 'Drama',
    act: 'Act 1',
    coupleNames: 'Alex & Jamie',
    ceremony: 'Central Park, 4:00 PM',
    reception: 'Grand Ballroom, 6:00 PM',
    dresscode: 'Black Tie'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200">
      {/* Navigation Bar */}
      <nav className="bg-white border-b-4 border-black shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50 print:hidden">
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
              <Button
                variant="outline"
                className="bg-black text-white border-black hover:bg-gray-800"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8 print:hidden">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Event Tickets</h1>
          <p className="text-gray-600">Featuring event images and barcode verification</p>
        </div>

        {/* Ticket Type Selector */}
        <div className="max-w-4xl mx-auto mb-8 print:hidden">
          <div className="flex flex-wrap gap-2 justify-center">
            {enhancedTicketTypes.map((type) => (
              <Button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                variant={selectedType === type.id ? 'default' : 'outline'}
                size="sm"
                className={
                  selectedType === type.id
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-white text-black border-black hover:bg-gray-100'
                }
              >
                {type.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Ticket */}
        <div className="mb-8 ticket-container">
          <SelectedTicketComponent {...defaultTicketProps} />
        </div>

        {/* Action Buttons */}
        <div className="max-w-lg mx-auto mb-8 print:hidden">
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
        <div className="text-center mb-8 print:hidden">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-black flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Button>
          </Link>
        </div>

        {/* Enhanced Features */}
        <div className="max-w-4xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 rounded-lg print:hidden">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Enhanced Ticket Features
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">🖼️ Event Image Integration</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  • <strong>Prominent visual context</strong> - Large hero image provides immediate
                  event recognition
                </li>
                <li>
                  • <strong>Gradient overlay</strong> - Ensures text readability over any image
                </li>
                <li>
                  • <strong>Price badge positioning</strong> - Consistent top-right placement for
                  quick reference
                </li>
                <li>
                  • <strong>Event branding</strong> - Images reinforce event identity and atmosphere
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">📊 Barcode Verification System</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  • <strong>Strategic placement</strong> - Bottom-right for easy scanner access
                </li>
                <li>
                  • <strong>Unique encoding</strong> - Event type, year, ID, and ticket class
                </li>
                <li>
                  • <strong>Readable format</strong> - Human-readable code below barcode
                </li>
                <li>
                  • <strong>Verification ready</strong> - Compatible with standard barcode scanners
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">🎨 Design Consistency</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-sm text-gray-600">
                <strong>Visual Hierarchy:</strong> Image → Event Info → Details → Barcode
              </div>
              <div className="text-sm text-gray-600">
                <strong>Color Coding:</strong> Event-specific themes with consistent iconography
              </div>
              <div className="text-sm text-gray-600">
                <strong>Information Architecture:</strong> Essential details prominently displayed
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Print Optimization:</strong> All tickets are optimized for printing with
              proper margins, hidden UI elements, and high contrast for barcode scanning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
