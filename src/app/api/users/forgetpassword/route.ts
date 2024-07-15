import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import { mailer} from "@/utils/mailer";
import { SignUpRequest, ApiResponse } from "@/types/types";

export async function POST(request: NextRequest) {
  try {
    const reqBody: SignUpRequest = await request.json();

    const { email } = reqBody;
    if (!email) {
      throw new Error("email required");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return NextResponse.json<ApiResponse>(
        {
          message: "User does not exists",
          success: false,
        },
        { status: 200 }
      );
    }

    await mailer({
      email: existingUser.email,
      emailType: "RESET",
      userId: existingUser.id,
    });
    return NextResponse.json<ApiResponse>(
      {
        message: "Click the link on your email to reset your password",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        message: `Something went wrong`,
        success: false,
      },
      { status: 500 }
    );
  }
}
