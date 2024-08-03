import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import { ApiResponse } from "@/types/types";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, title, theme } = reqBody;
    if (!title || !email) {
      throw new Error("title and email required");
    }
    await prisma.list.create({
      data: {
        userEmail: email,
        title,
        theme,
      },
    });

    return NextResponse.json<ApiResponse>(
      {
        message: "List created successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        message: `Error ${error}`,
        success: false,
      },
      { status: 500 }
    );
  }
}
