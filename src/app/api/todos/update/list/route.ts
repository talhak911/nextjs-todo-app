import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import { ApiResponse } from "@/types/types";

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { listId, title, theme } = reqBody;
    if (!listId) {
      throw new Error("title , listId and theme required");
    }
    if (title && theme) {
      await prisma.list.update({
        where: {
          id: listId,
        },
        data: {
          title,
          theme,
        },
      });
    } else if (title) {
      await prisma.list.update({
        where: {
          id: listId,
        },
        data: {
          title,
        },
      });
    } else if (theme) {
      await prisma.list.update({
        where: {
          id: listId,
        },
        data: {
          theme,
        },
      });
    }

    return NextResponse.json<ApiResponse>(
      {
        message: "List Updated successfully",
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
