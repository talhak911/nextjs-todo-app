"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import { fetchLists } from "@/redux/slices/listSlice"
import { useEffect } from "react"

export const useViewLists=()=>{
 const email = useAppSelector(state=>state.auth.user?.email)
 const lists =useAppSelector(state=>state.lists.lists)
const dispatch= useAppDispatch()
console.log(email)
useEffect(()=>{
if(typeof email === "string"){
    dispatch(fetchLists(email))
}
},[dispatch,email])
return {
    lists
}
}

