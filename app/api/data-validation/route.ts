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
    // if (email) {
    //   const apiKey = process.env.RESEND_API_KEY;
    //   if (apiKey) {
    //     const resend = new Resend(apiKey);
    //     await resend.emails.send({
    //       from: 'Eventful <no-reply@jbottoms.com>',
    //       to: [email],
    //       subject: 'Your Eventful Ticket Details',
    //       html: `<h2>Thank you for your purchase!</h2><p>Your phone number: ${phoneNumber || 'N/A'}</p>`
    //     });
    //   }
    // }

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
