import { NextRequest, NextResponse } from "next/server";
import prisma from "prismaClientPath";
import { ApiResponse } from "typesPath";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { listId } = reqBody;
    if (!listId) {
      throw new Error("task id required");
    }

    const tasks = await prisma.task.findMany({ where: { listId } });

    return NextResponse.json(tasks, { status: 200 });
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
