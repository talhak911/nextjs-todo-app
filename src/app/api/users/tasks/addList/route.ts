import {NextRequest,NextResponse} from 'next/server'
import {prisma} from '@/../prisma/client'
import { AddTask, apiResponse } from '@/types/types'

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json()
        const {userId,title}= reqBody
        if( !title){
            throw new Error("title and email required")
          }
          //const newList =
          await prisma.list.create({data:{
            userId,
            title}})

          return NextResponse.json<apiResponse>({
            message: "List created successfully",
            success: true,
            },{status:200})
    }
    catch(error){
        return NextResponse.json<apiResponse>({
          message: `Error ${error}`,
          success: false,
          },{ status: 500 })
      
    }

}