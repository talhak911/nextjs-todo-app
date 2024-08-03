import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import { ApiResponse } from "@/types/types";

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { taskId, status } = reqBody;
    if (!taskId) {
      throw new Error("task Id is required");
    }
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        isCompleted: status,
      },
    });

    return NextResponse.json<ApiResponse>(
      {
        message: "Task Updated successfully",
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
