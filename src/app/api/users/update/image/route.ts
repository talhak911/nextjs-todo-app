import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import { ApiResponse } from "@/types/types";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, imageBuffer } = reqBody;

    if (!email && !imageBuffer) {
      throw new Error("email password required");
    }

    await prisma.user.update({
      where: { email },
      data: { image: Buffer.from(imageBuffer, "base64") },
    });

    return NextResponse.json<ApiResponse>(
      {
        message: "Profile picture updated successfully",
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
