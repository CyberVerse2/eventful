import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received callback:', body);

    // Try to send email if present
    const email = body.requestedInfo?.email || body.email;
    const phoneNumber = body.requestedInfo?.phoneNumber || body.phoneNumber;
    if (email) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: 'Eventful <no-reply@jbottoms.com>',
          to: [email],
          subject: 'Your Eventful Ticket Details',
          html: `<h2>Thank you for your purchase!</h2><p>Your phone number: ${phoneNumber || 'N/A'}</p>`
        });
      }
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
