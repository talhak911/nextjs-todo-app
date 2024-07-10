import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/../prisma/client";
import { ApiResponse } from "@/types/types";

export async function POST(request: NextRequest) {
    try {
        //changed email to {email}
        const reqbody =await request.json();
        const {email} = reqbody
        if (!email){
             throw new Error("email password required")
              }
        const user = await prisma.user.findFirst({
            where: { email: email },
            select: {
               // id: true,
                name: true,
                email: true,
                image:true
               
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch(error){
        return NextResponse.json<ApiResponse>({
          message: `Something went wrong, ${error}`,
          success: false,
          },{ status: 500 })
      
    }
}
