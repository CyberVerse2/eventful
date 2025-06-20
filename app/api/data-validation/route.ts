import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  try {
    const email = requestData.requestedInfo?.email;
    const physicalAddress = requestData.requestedInfo?.physicalAddress;
    const errors: any = {};
    if (email && email.endsWith('@example.com')) {
      errors.email = 'Example.com emails are not allowed';
    }
    if (physicalAddress) {
      if (physicalAddress.postalCode && physicalAddress.postalCode.length < 5) {
        if (!errors.physicalAddress) errors.physicalAddress = {};
        errors.physicalAddress.postalCode = 'Invalid postal code';
      }
      if (physicalAddress.countryCode === 'XY') {
        if (!errors.physicalAddress) errors.physicalAddress = {};
        errors.physicalAddress.countryCode = "We don't ship to this country";
      }
    }
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors });
    }
    return NextResponse.json({
      calls: requestData.calls,
      chainId: requestData.chainId,
      capabilities: requestData.capabilities
    });
  } catch (error) {
    return NextResponse.json({ errors: { server: 'Server error validating data' } });
  }
}
