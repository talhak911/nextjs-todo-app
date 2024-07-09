// import { getDataFromToken } from "@/utils/getDataFromToken";
// import { NextRequest, NextResponse } from "next/server";
// import  prisma  from "@/../prisma/client";

// export async function GET(request: NextRequest) {
//     try {
//         const userId = await getDataFromToken(request);

//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//             select: {
//                 id: true,
//                 name: true,
//                 email: true,
//                 isVerified: true,
              
//                 // other fields you want to select
//             }
//         });

//         if (!user) {
//             return NextResponse.json({ error: "User not found" }, { status: 404 });
//         }

//         return NextResponse.json({
//             message: "User found",
//             data: user
//         });
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 400 });
//     }
// }
