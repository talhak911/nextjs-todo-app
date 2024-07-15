import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import bcryptjs from "bcryptjs";
import { ApiResponse } from "@/types/types";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;
    if (!email || !password) {
      throw new Error("email required");
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const existingUser = await prisma.user.update({
      where: { email },
      data: { hashedPassword: hashedPassword },
    });
    if (!existingUser) {
      return NextResponse.json<ApiResponse>(
        {
          message: "User does not exists",
          success: false,
        },
        { status: 200 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        message: "password changed successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        message: `Something went wrong ${error}`,
        success: false,
      },
      { status: 500 }
    );
  }
}
