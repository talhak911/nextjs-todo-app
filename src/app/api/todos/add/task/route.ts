import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import { ApiResponse } from "@/types/types";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { listId, title } = reqBody;
    if (!listId && !title) {
      throw new Error("title and id required");
    }
    //const newTask =
    await prisma.task.create({ data: { title, listId } });

    return NextResponse.json<ApiResponse>(
      {
        message: "Task created successfully",
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
