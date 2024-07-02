import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/../prisma/client';
import bcryptjs from 'bcryptjs';
import { SignJWT } from 'jose';
import { sendEmail } from '@/utils/mailer';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid Email! or Password" }, { status: 400 });
    }
    console.log("User exists");
   
    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Email or Password!" }, { status: 400 });
    }
    console.log(user);
    if(!user.isVerified){
      await sendEmail({email,emailType:'VERIFY',userId:user.id})
      return NextResponse.json({ error: "verify your account email has been sent to you" }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    // Create token
    const token = await new SignJWT(tokenData)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 86400 // 1 day in seconds
    });

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
