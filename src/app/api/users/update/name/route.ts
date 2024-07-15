import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import { ApiResponse } from "@/types/types";

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email } = reqBody;
    if (!name) {
      throw new Error("Name is required");
    }
    //const newList =
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
      },
    });
    
    return NextResponse.json<ApiResponse>(
      {
        message: user.name as string,
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
