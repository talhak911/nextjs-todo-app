import {NextRequest,NextResponse} from 'next/server'
import {prisma} from '@/../prisma/client'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/utils/mailer'
import { SignUpRequest, apiResponse } from '@/types/types'



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
        return NextResponse.json({error: "User already exists"}, {status: 400})
    }
         //hash password
         const salt = await bcryptjs.genSalt(10)
         const hashedPassword = await bcryptjs.hash(password, salt)
         const newUser = await prisma.user.create({
            data: {
              name,
              email,
              password: hashedPassword  //update model
            }
          })

console.log("user createeed")
        await sendEmail({email,emailType:'VERIFY',userId:newUser.id})
        return NextResponse.json<apiResponse>({
            message: "User created successfully",
            success: true,
            },{status:200})
        
    } catch(error){
      console.log(error)
        return NextResponse.json<apiResponse>({
          message: `Error ${error}`,
          success: false,
          },{ status: 500 })
      
    }
}