import {NextRequest,NextResponse} from 'next/server'
import prisma from '@/../prisma/client'
import bcryptjs from 'bcryptjs'
import { ApiResponse } from '@/types/types'

export async function POST(request:NextRequest) {
    try{
        const reqBody= await request.json()
        const {token,password}= reqBody
        const user = await prisma.user.findFirst({
            where: {
              forgotPasswordToken:token,
              forgotPasswordTokenExpiry: {
                gt: new Date(Date.now())
              }
            }
          })
          if (!user) {
            return NextResponse.json<ApiResponse>({message:"Invalid token",success:false}, {status: 400})
        }
        console.log(user);

        await prisma.user.update({
            where: { id: user.id },
            data: {
              hashedPassword:await bcryptjs.hash(password,12),
              forgotPasswordToken:null,
              forgotPasswordTokenExpiry:null
            }
          });
      
          return NextResponse.json<ApiResponse>({
            message: "Password Changed Successfully",
            success: true
          }, { status: 200 });
      
        } catch (error: any) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
      }