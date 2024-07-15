import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import { ApiResponse } from "@/types/types";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, email } = reqBody;
    if (!token || !email) {
      return NextResponse.json<ApiResponse>(
        { message: "token or email missing", success: false },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        changeEmailToken: token,
        changeEmailTokenExpiry: {
          gt: new Date(Date.now()),
        },
      },
    });
    if (!user) {
      return NextResponse.json<ApiResponse>(
        { message: "Invalid token", success: false },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: email,
        changeEmailToken: null,
        changeEmailTokenExpiry: null,
      },
    });

    return NextResponse.json<ApiResponse>(
      {
        message: "Email Changed Successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
