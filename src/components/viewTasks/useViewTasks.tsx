"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import { fetchLists } from "@/redux/slices/listSlice"
import { fetchTasks } from "@/redux/slices/taskSlice"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const useViewTasks= ()=>{
const listId = useSearchParams().get("listId")
const email = useAppSelector(state=>state.auth.user?.email)
 const tasks =useAppSelector(state=>state.tasks.tasks)
 const list = useAppSelector((state)=>{
   const listName =state.lists.lists.find((item)=>item.id === listId)
  
  return listName?.title
 })
console.log(list)
const dispatch= useAppDispatch()

useEffect(()=>{

  if(listId && email){
    dispatch(fetchTasks(listId))
    dispatch(fetchLists(email))
  }
},[dispatch,listId,email])
return {
  list,
    tasks
}
}
