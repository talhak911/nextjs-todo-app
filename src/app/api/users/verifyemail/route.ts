import {NextRequest,NextResponse} from 'next/server'
import {prisma} from '@/../prisma/client'


export async function POST(request:NextRequest) {
    try{
        const reqBody= await request.json()
        const {token}= reqBody
        const user = await prisma.user.findFirst({
            where: {
              verifyToken: token,
              verifyTokenExpiry: {
                gt: new Date(Date.now())
              }
            }
          })
          if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        await prisma.user.update({
            where: { id: user.id },
            data: {
              isVerified: true,
              verifyToken: null,
              verifyTokenExpiry: null
            }
          });
      
          return NextResponse.json({
            message: "Email verified successfully",
            success: true
          }, { status: 200 });
      
        } catch (error: any) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
      }