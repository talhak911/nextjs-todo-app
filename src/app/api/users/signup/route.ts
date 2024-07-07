import {NextRequest,NextResponse} from 'next/server'
import prisma from '@/../prisma/client'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/utils/mailer'
import { SignUpRequest, ApiResponse } from '@/types/types'



export async function POST(request:NextRequest) {
    try{
      const reqBody : SignUpRequest= await request.json()
      
      const {name,email,password}= reqBody
      if(!email && !password){
        throw new Error("email password required")
      }
      console.log(reqBody)

      const existingUser = await prisma.user.findUnique({where:{email}})
      if(existingUser){
        return NextResponse.json<ApiResponse>({
          message: "User already exists",
          success: false,
          },{status:200})
    }
         //hash password
         const hashedPassword = await bcryptjs.hash(password, 12)
         const newUser = await prisma.user.create({
            data: {
              name,
              email,
              hashedPassword,  //update model
            }
          })


        await sendEmail({email,emailType:'VERIFY',userId:newUser.id})
        return NextResponse.json<ApiResponse>({
            message: "Account created successfully verify your email to sign In",
            success: true,
            },{status:200})
        
    } catch(error){
        return NextResponse.json<ApiResponse>({
          message: `Something went wrong`,
          success: false,
          },{ status: 500 })
      
    }
}