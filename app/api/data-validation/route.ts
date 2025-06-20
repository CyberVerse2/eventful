import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
  try {
    // Try to send email if present
    const body = await req.json();
    let email = body.email;
    let phoneNumber = body.phoneNumber;
    if (body.requestedInfo && typeof body.requestedInfo === 'object') {
      if ('email' in body.requestedInfo) email = body.requestedInfo.email;
      if ('phoneNumber' in body.requestedInfo) phoneNumber = body.requestedInfo.phoneNumber;
    }

    // Read query params for eventId and type
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId') || '1';
    const ticketType = searchParams.get('type') || 'VIP';

    // Hardcoded event details for Crypto Summit 2024
    const event = {
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
        { type: 'Standard', price: 199 },
        { type: 'VIP', price: 399 },
        { type: 'Executive', price: 799 }
      ]
    };
    const ticket = event.tickets.find((t) => t.type === ticketType) || event.tickets[1];
    const ticketId = `CS2024-${ticket.type.toUpperCase()}-001`;

    if (email) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: 'Eventful <no-reply@thecyberverse.xyz>',
          to: [email],
          subject: 'Your Crypto Summit 2024 Ticket',
          html: `
            <div style="max-width:480px;margin:0 auto;background:#fff;border:4px solid #000;border-radius:16px;overflow:hidden;font-family:Arial,sans-serif;">
              <!-- Event Image Header -->
              <div style="position:relative;height:192px;overflow:hidden;background:#222;">
                <img src="${event.image}" alt="${event.title}" style="width:100%;height:192px;object-fit:cover;display:block;" />
                <div style="position:absolute;top:16px;right:16px;background:#FFD600;color:#000;padding:6px 16px;border-radius:999px;border:2px solid #000;font-weight:bold;font-size:16px;">$${ticket.price}</div>
                <div style="position:absolute;bottom:16px;left:16px;right:16px;color:#fff;">
                  <div style="font-size:12px;letter-spacing:1px;opacity:0.9;margin-bottom:4px;">${event.category} • ${ticket.type}</div>
                  <div style="font-size:20px;font-weight:bold;">${event.title}</div>
                  <div style="font-size:14px;opacity:0.9;">${event.location}</div>
                </div>
              </div>
              <!-- Event Details -->
              <div style="padding:24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                  <tr>
                    <td style="font-size:12px;color:#888;text-transform:uppercase;">Date</td>
                    <td style="font-size:12px;color:#888;text-transform:uppercase;">Start Time</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px;font-weight:500;color:#222;">${event.date}</td>
                    <td style="font-size:15px;font-weight:500;color:#222;">${event.time}</td>
                  </tr>
                  <tr><td colspan="2" style="height:8px;"></td></tr>
                  <tr>
                    <td style="font-size:12px;color:#888;text-transform:uppercase;">Venue</td>
                    <td style="font-size:12px;color:#888;text-transform:uppercase;">Holder</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px;font-weight:500;color:#222;">${event.location}</td>
                    <td style="font-size:15px;font-weight:500;color:#222;">${email || 'N/A'}</td>
                  </tr>
                </table>
                <!-- Barcode Section -->
                <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #eee;padding-top:16px;">
                  <div style="flex:1;">
                    <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px;">Ticket ID</div>
                    <div style="font-family:monospace;font-size:13px;color:#555;">${ticketId}</div>
                  </div>
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${ticketId}" alt="Barcode" style="margin-left:16px;width:80px;height:80px;background:#fff;border:1px solid #eee;border-radius:8px;" />
                </div>
              </div>
              <div style="background:#fafafa;padding:16px 24px;border-top:1px solid #eee;font-size:12px;color:#888;text-align:center;">
                Valid for single entry &bull; eventful.com
              </div>
              <!-- User Info and Event Details -->
              <div style="padding:24px 24px 8px 24px;">
                <h3 style="font-size:16px;font-weight:bold;margin-bottom:8px;color:#222;">Your Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Email:</td>
                    <td style="font-size:13px;color:#222;">${email || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Phone:</td>
                    <td style="font-size:13px;color:#222;">${phoneNumber.number || 'N/A'}</td>
                  </tr>
                </table>
                <h3 style="font-size:16px;font-weight:bold;margin-bottom:8px;color:#222;">Event Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Event:</td>
                    <td style="font-size:13px;color:#222;">${event.title}</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Category:</td>
                    <td style="font-size:13px;color:#222;">${event.category}</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Date:</td>
                    <td style="font-size:13px;color:#222;">${event.date}</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Time:</td>
                    <td style="font-size:13px;color:#222;">${event.time}</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Venue:</td>
                    <td style="font-size:13px;color:#222;">${event.location}</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Ticket Type:</td>
                    <td style="font-size:13px;color:#222;">${ticket.type}</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Ticket ID:</td>
                    <td style="font-size:13px;color:#222;">${ticketId}</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Description:</td>
                    <td style="font-size:13px;color:#222;">${event.description}</td>
                  </tr>
                </table>
              </div>
            </div>
          `
        });
      }
    } else {
      console.log('No email found');
    }

    // Always return the required fields for the wallet
    return NextResponse.json(
      {
        calls: body.calls,
        chainId: body.chainId,
        version: body.version,
        capabilities: body.capabilities
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing data:', error);
    return NextResponse.json(
      { errors: { server: 'Server error validating data' } },
      { status: 500 }
    );
  }
}
