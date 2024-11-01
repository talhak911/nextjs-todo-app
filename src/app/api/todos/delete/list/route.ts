import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import { ApiResponse } from "@/types/types";

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { listId } = reqBody;
    if (!listId) {
      throw new Error("task id required");
    }

    await prisma.list.delete({
      where: {
        id: listId,
      },
    });

    return NextResponse.json<ApiResponse>(
      {
        message: "List deleted successfully",
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
