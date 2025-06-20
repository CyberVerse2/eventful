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
    if (email) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: 'Eventful <no-reply@thecyberverse.xyz>',
          to: [email],
          subject: 'Your Eventful Ticket Details',
          html: `
            <div style="max-width:480px;margin:0 auto;background:#fff;border:4px solid #000;border-radius:16px;overflow:hidden;font-family:Arial,sans-serif;">
              <!-- Event Image Header -->
              <div style="position:relative;height:192px;overflow:hidden;background:#222;">
                <img src="https://imgs.search.brave.com/h1Za-S5Wn3c3_Z-1fmj02CSmeeqcpAXiUoiJPdtT2rs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtZXh0LmJpenph/Ym8uY29tL2Jpenph/Ym9wcm9kL2ltYWdl/L3VwbG9hZC9xX2F1/dG8sZl9hdXRvLGNf/c2NhbGUsY19jcm9w/LGdfY3VzdG9tL3Yx/Njg0OTM3ODM0L2dz/amtjYTE3NmkwOGJ4/cTcyMTky.jpeg" alt="Event" style="width:100%;height:192px;object-fit:cover;display:block;" />
                <div style="position:absolute;top:16px;right:16px;background:#FFD600;color:#000;padding:6px 16px;border-radius:999px;border:2px solid #000;font-weight:bold;font-size:16px;">$99</div>
                <div style="position:absolute;bottom:16px;left:16px;right:16px;color:#fff;">
                  <div style="font-size:12px;letter-spacing:1px;opacity:0.9;margin-bottom:4px;">Pop • VIP</div>
                  <div style="font-size:20px;font-weight:bold;">Sample Artist</div>
                  <div style="font-size:14px;opacity:0.9;">Sample Event</div>
                </div>
              </div>
              <!-- Event Details -->
              <div style="padding:24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                  <tr>
                    <td style="font-size:12px;color:#888;text-transform:uppercase;">Date</td>
                    <td style="font-size:12px;color:#888;text-transform:uppercase;">Doors / Show</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px;font-weight:500;color:#222;">2024-07-15</td>
                    <td style="font-size:15px;font-weight:500;color:#222;">6:00 PM / 7:00 PM</td>
                  </tr>
                  <tr><td colspan="2" style="height:8px;"></td></tr>
                  <tr>
                    <td style="font-size:12px;color:#888;text-transform:uppercase;">Venue</td>
                    <td style="font-size:12px;color:#888;text-transform:uppercase;">Holder</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px;font-weight:500;color:#222;">Sample Venue</td>
                    <td style="font-size:15px;font-weight:500;color:#222;">John Doe</td>
                  </tr>
                </table>
                <!-- Barcode Section -->
                <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #eee;padding-top:16px;">
                  <div style="flex:1;">
                    <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px;">Ticket ID</div>
                    <div style="font-family:monospace;font-size:13px;color:#555;">TICKET-001</div>
                  </div>
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=TICKET-001" alt="Barcode" style="margin-left:16px;width:80px;height:80px;background:#fff;border:1px solid #eee;border-radius:8px;" />
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
                    <td style="font-size:13px;color:#222;">${phoneNumber || 'N/A'}</td>
                  </tr>
                </table>
                <h3 style="font-size:16px;font-weight:bold;margin-bottom:8px;color:#222;">Event Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Event:</td>
                    <td style="font-size:13px;color:#222;">Sample Event</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Artist:</td>
                    <td style="font-size:13px;color:#222;">Sample Artist</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Date:</td>
                    <td style="font-size:13px;color:#222;">2024-07-15</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Time:</td>
                    <td style="font-size:13px;color:#222;">7:00 PM</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Venue:</td>
                    <td style="font-size:13px;color:#222;">Sample Venue</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Ticket Type:</td>
                    <td style="font-size:13px;color:#222;">VIP</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Ticket ID:</td>
                    <td style="font-size:13px;color:#222;">TICKET-001</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#888;width:120px;">Holder:</td>
                    <td style="font-size:13px;color:#222;">John Doe</td>
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
