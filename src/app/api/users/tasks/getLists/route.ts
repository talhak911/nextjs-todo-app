
import {NextRequest,NextResponse} from 'next/server'
import {prisma} from 'prismaClientPath'
import {  apiResponse } from "typesPath"

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json()
        const {userId}= reqBody
        if(!userId){
            throw new Error("task id required")
          }
       
         const lists= await prisma.list.findMany({where:{userId}})
          return NextResponse.json(lists,{status:200})
    }
    catch(error){
        return NextResponse.json<apiResponse>({
          message: `Error ${error}`,
          success: false,
          },{ status: 500 })
      
    }

}