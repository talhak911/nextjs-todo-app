import { NextRequest, NextResponse } from "next/server";
import prisma from "prismaClientPath";
import { ApiResponse } from "typesPath";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    if (!email) {
      throw new Error("task id required");
    }

    const lists = await prisma.list.findMany({ where: { userEmail: email } });
    return NextResponse.json(lists, { status: 200 });
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
