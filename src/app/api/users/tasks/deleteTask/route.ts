import {NextRequest,NextResponse} from 'next/server'
import prisma from '@/../prisma/client'
import { AddTask, apiResponse } from '@/types/types'

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json()
        const {taskId}= reqBody
        if(!taskId){
            throw new Error("task id required")
          }
          //const newTask =
          await prisma.task.delete({where:{
            id:taskId}})

          return NextResponse.json<apiResponse>({
            message: "Task deleted successfully",
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