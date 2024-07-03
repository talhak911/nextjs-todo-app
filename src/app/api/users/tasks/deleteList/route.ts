//testing remaing !!!

import {NextRequest,NextResponse} from 'next/server'
import prisma from '@/../prisma/client'
import {  apiResponse } from '@/types/types'

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json()
        const {listId}= reqBody
        if(!listId){
            throw new Error("task id required")
          }
       
          await prisma.list.delete({where:{
            id:listId}})

          return NextResponse.json<apiResponse>({
            message: "List deleted successfully",
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