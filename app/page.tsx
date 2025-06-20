'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star, ArrowRight, Minus, Plus, Check } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import React from 'react';
import { encodeFunctionData, erc20Abi, parseUnits } from 'viem';

// Type definitions
interface Ticket {
  type: string;
  price: number;
  available: number;
  color: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  rating: number;
  attendees: number;
  description: string;
  tickets: Ticket[];
}

const events = [
  {
    id: 1,
    title: 'Crypto Summit 2024',
    date: 'October 10, 2024',
    time: '9:00 AM',
    location: 'Web3 Convention Center, San Francisco',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    category: 'Conference',
    rating: 4.9,
    attendees: 3200,
    description:
      'The premier blockchain and Web3 conference featuring top speakers, hands-on workshops, and networking with industry leaders. Organized by @Web.',
    tickets: [
      { type: 'Standard', price: 199, available: 200, color: 'bg-green-500' },
      { type: 'VIP', price: 399, available: 50, color: 'bg-yellow-500' },
      { type: 'Executive', price: 799, available: 10, color: 'bg-purple-500' }
    ]
  }
];

export default function TicketingPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [openPerks, setOpenPerks] = useState<string | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const { connect, connectors, isPending } = useConnect();
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setSelectedTickets({});
    setCurrentStep(2);
  };

  const handleTicketChange = (ticketType: string, change: number) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketType]: Math.max(0, (prev[ticketType] || 0) + change)
    }));
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce(
      (sum, count) => sum + (typeof count === 'number' ? count : 0),
      0
    );
  };

  const getTotalPrice = () => {
    if (!selectedEvent) return 0;
    return Object.entries(selectedTickets).reduce((total, [ticketType, count]) => {
      const ticket = selectedEvent.tickets.find((t) => t.type === ticketType);
      return total + (ticket ? ticket.price * (typeof count === 'number' ? count : 0) : 0);
    }, 0);
  };

  const getProgressValue = () => {
    switch (currentStep) {
      case 1:
        return 33;
      case 2:
        return 66;
      case 3:
        return 100;
      default:
        return 33;
    }
  };

  // --- main render ---
  return (
    <>
      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setPrivacyOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
            <div className="text-gray-700 text-sm mb-6 max-h-64 overflow-y-auto">
              <p>
                We collect your email and phone number solely for the purpose of ticket delivery and
                event updates. Your information will not be shared with third parties except as
                required to fulfill your order or by law. By accepting, you consent to this use of
                your data in accordance with our privacy practices.
              </p>
              <p className="mt-4">For more information, contact us at privacy@eventful.com.</p>
            </div>
            <button
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              onClick={() => setPrivacyOpen(false)}
            >
              Accept
            </button>
          </div>
        </div>
      )}

      {/* Main content (steps 1, 2, 3) */}
      {currentStep === 1 && (
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
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black font-medium transition-colors"
                  >
                    Events
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black font-medium transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black font-medium transition-colors"
                  >
                    Contact
                  </a>
                  <ConnectWalletButton />
                </div>
                <div className="md:hidden">
                  <Button variant="outline" size="sm" className="border-black">
                    Menu
                  </Button>
                </div>
              </div>
            </div>
          </nav>
          <div className="container mx-auto px-4 py-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Discover Amazing Events
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Find and book tickets for the most exciting events happening near you
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="relative">
                    <Image
                      src={event.image || '/placeholder.svg'}
                      alt={event.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-yellow-500 text-black font-semibold">
                      {event.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{event.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.attendees}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-600">Starting from</span>
                        <div className="text-2xl font-bold text-gray-900">
                          ${Math.min(...event.tickets.map((t) => t.price))}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleEventSelect(event)}
                        className="bg-black text-white hover:bg-gray-800"
                      >
                        Select Tickets
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && selectedEvent && (
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
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black font-medium transition-colors"
                  >
                    Events
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black font-medium transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black font-medium transition-colors"
                  >
                    Contact
                  </a>
                  <ConnectWalletButton />
                </div>
                <div className="md:hidden">
                  <Button variant="outline" size="sm" className="border-black">
                    Menu
                  </Button>
                </div>
              </div>
            </div>
          </nav>
          <div className="container mx-auto px-4 py-4">
            {/* Progress Indicator */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Step 2 of 3</span>
                <span className="text-sm font-medium text-gray-700">Select Tickets</span>
              </div>
              <Progress value={getProgressValue()} className="h-2" />
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
              {/* Event Details */}
              <div className="lg:col-span-2">
                <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <Image
                        src={selectedEvent.image || '/placeholder.svg'}
                        alt={selectedEvent.title}
                        width={200}
                        height={150}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <Badge className="bg-yellow-500 text-black font-semibold mb-2">
                          {selectedEvent.category}
                        </Badge>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedEvent.title}
                        </h2>
                        <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{selectedEvent.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{selectedEvent.time}</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{selectedEvent.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ticket Selection */}
                <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-gray-900">Select Your Tickets</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedEvent.tickets.map((ticket) => (
                        <div
                          key={ticket.type}
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors mb-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-4 h-4 rounded-full ${ticket.color}`}></div>
                              <div>
                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                  {ticket.type}
                                  <button
                                    className="text-xs text-gray-600 hover:text-gray-900 ml-2"
                                    onClick={() =>
                                      setOpenPerks(openPerks === ticket.type ? null : ticket.type)
                                    }
                                    type="button"
                                  >
                                    Click to see perks
                                  </button>
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {ticket.available} available
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xl font-bold text-gray-900">
                                ${ticket.price}
                              </span>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleTicketChange(ticket.type, -1)}
                                  disabled={!selectedTickets[ticket.type]}
                                  className="w-8 h-8 p-0"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center font-medium">
                                  {selectedTickets[ticket.type] || 0}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleTicketChange(ticket.type, 1)}
                                  disabled={(selectedTickets[ticket.type] || 0) >= ticket.available}
                                  className="w-8 h-8 p-0"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          {openPerks === ticket.type && (
                            <div className="mt-4 bg-white border-4 border-black rounded p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
                              <h5 className="font-semibold text-gray-900 mb-2">
                                Perks for {ticket.type}
                              </h5>
                              <ul className="list-disc list-inside text-sm text-gray-700">
                                <li>Priority entry</li>
                                <li>Free drink</li>
                                <li>Exclusive merch</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-8">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(selectedTickets).map(([ticketType, count]) => {
                        if (count === 0) return null;
                        const ticket = selectedEvent.tickets.find((t) => t.type === ticketType);
                        if (!ticket) return null;
                        return (
                          <div key={ticketType} className="flex justify-between">
                            <div>
                              <span className="font-medium">{ticketType}</span>
                              <span className="text-gray-600 ml-2">x{count}</span>
                            </div>
                            <span className="font-medium">
                              ${ticket.price * (typeof count === 'number' ? count : 0)}
                            </span>
                          </div>
                        );
                      })}

                      {getTotalTickets() > 0 && (
                        <>
                          <Separator />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total ({getTotalTickets()} tickets)</span>
                            <span>${getTotalPrice()}</span>
                          </div>
                          <Button
                            className="w-full bg-black text-white hover:bg-gray-800"
                            onClick={async () => {
                              console.log('One Click Pay pressed');
                              // Find the Coinbase Wallet connector
                              const coinbaseConnector = connectors.find(
                                (c) => c.name === 'Coinbase Wallet'
                              );
                              if (!coinbaseConnector) {
                                alert('Coinbase Smart Wallet connector not found.');
                                return;
                              }
                              const provider = await coinbaseConnector.getProvider();
                              if (!provider) {
                                alert('No provider found for the connected wallet.');
                                return;
                              }
                              if (typeof (provider as any).request !== 'function') {
                                alert(
                                  'The connected wallet provider does not support EIP-1193 requests.'
                                );
                                return;
                              }
                              try {
                                const usdcAddress = '0x036CbD53842c5426634e7929541eC2318f3dCF7e'; // USDC on Base Sepolia
                                const recipient = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'; // Example recipient
                                const amount = parseUnits('0.01', 6); // 0.01 USDC (6 decimals)
                                const requests = [
                                  { type: 'email', optional: false },
                                  { type: 'phoneNumber', optional: false }
                                ];
                                const params = [
                                  {
                                    version: '1.0',
                                    chainId: '0x14A34', // baseSepolia in hex (84532)
                                    calls: [
                                      {
                                        to: usdcAddress,
                                        data: encodeFunctionData({
                                          abi: erc20Abi,
                                          functionName: 'transfer',
                                          args: [recipient, amount]
                                        })
                                      }
                                    ],
                                    capabilities: {
                                      dataCallback: {
                                        requests,
                                        callbackURL:
                                          'https://ef3b-2a09-bac5-4dd4-6d2-00-ae-17.ngrok-free.app/api/data-validation'
                                      }
                                    }
                                  }
                                ];
                                console.log('Sending wallet_sendCalls with params:', params);
                                const response = await (provider as any).request({
                                  method: 'wallet_sendCalls',
                                  params
                                });
                                console.log('Smart wallet response:', response);
                                setCurrentStep(3);
                              } catch (err: any) {
                                console.error('Smart wallet error:', err);
                                alert(
                                  'There was an error with the smart wallet transaction: ' +
                                    (err?.message || err)
                                );
                              }
                            }}
                          >
                            One Click Pay – ${getTotalPrice()}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          <p className="text-xs text-gray-600 mt-2 text-center">
                            By continuing, you agree to share your email and phone number for ticket
                            delivery and event updates. See our{' '}
                            <button
                              type="button"
                              className="underline text-blue-600"
                              onClick={() => setPrivacyOpen(true)}
                            >
                              Privacy Policy
                            </button>{' '}
                            for details.
                          </p>
                        </>
                      )}

                      {getTotalTickets() === 0 && (
                        <p className="text-gray-500 text-center py-4">Select tickets to continue</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="bg-white text-black border-black hover:bg-gray-100"
              >
                ← Back to Events
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
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
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black font-medium transition-colors"
                  >
                    Events
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black font-medium transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-black font-medium transition-colors"
                  >
                    Contact
                  </a>
                  <ConnectWalletButton />
                </div>
                <div className="md:hidden">
                  <Button variant="outline" size="sm" className="border-black">
                    Menu
                  </Button>
                </div>
              </div>
            </div>
          </nav>
          <div className="container mx-auto px-4 py-4">
            {/* Progress Indicator */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Step 3 of 3</span>
                <span className="text-sm font-medium text-gray-700">Checkout</span>
              </div>
              <Progress value={getProgressValue()} className="h-2" />
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
                  <p className="text-gray-600 mb-8">
                    Thank you for your purchase. Your tickets have been sent to your email.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">Order Details</h3>
                    <div className="text-left space-y-2">
                      <div className="flex justify-between">
                        <span>Event:</span>
                        <span className="font-medium">{selectedEvent?.title || ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">{selectedEvent?.date || ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Tickets:</span>
                        <span className="font-medium">{getTotalTickets()}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t">
                        <span>Total Paid:</span>
                        <span>${getTotalPrice()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
