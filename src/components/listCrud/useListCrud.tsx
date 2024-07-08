"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import { addList, deleteList, fetchLists, updateList } from "@/redux/slices/listSlice"
import { revalidatePath } from "next/cache"
import { ChangeEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"

export const useListCrud=()=>{

   const dispatch = useAppDispatch()
   const [loading,setLoading]=useState(false)
   const [title,setTitle]=useState("")
   const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
   const [theme,setTheme]=useState("")
   const email = useAppSelector(state=>state.auth.user?.email)
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };
  
const updateTitle=(title:string)=>{
  useEffect(()=>{
    setTitle(title)
  },[])
}
const [visible,setVisible]= useState(false)
const handleThemeSelect = (themeName: string) => {
  const theme = themeName.toLowerCase().replace(" ","-")
  setTheme(theme)
   setSelectedTheme(themeName);
 };



const handleAddList = async () => {
  
   console.log("add list click")
   try {
    setLoading(true)
   if (title.length <3) {
      toast.error("List name too short");
     } else
     {
      if(typeof email === "string"){
      const res =await dispatch(addList({email:email,theme:theme,title:title}))
 
       if(res?.meta.requestStatus=="rejected"){
         toast.error("rejected error " +res?.payload as string);
       }
       else if (res?.meta.requestStatus=="fulfilled"){
        setSelectedTheme("")
        setTitle("")
        setVisible(false)
         toast.success("List add");
         if(typeof email === "string"){
          dispatch(fetchLists(email))
      }
          
       }
     }  }

   } catch (error: any) {
   
       toast.error("Error")
   }
   finally{
     setLoading(false)
   }
 };




const handleUpdateList = async (listIdToUpdate:string) => {
  
   console.log("update list click")
   try {
    setLoading(true)
   if (title.length <3) {
      toast.error("List name too short");
     } else
     {
      
      const res =await dispatch(updateList({listId:listIdToUpdate,theme:theme,title:title}))
 
       if(res?.meta.requestStatus=="rejected"){
         toast.error("rejected error " +res?.payload as string);
       }
       else if (res?.meta.requestStatus=="fulfilled"){
        setSelectedTheme("")
        setTitle("")
         toast.success("List updated");
       
         if(typeof email === "string"){
          dispatch(fetchLists(email))
      }
       }
      }

   } catch (error: any) {
    console.log(error)
       toast.error("Error",error.message)
   }
   finally{
     setLoading(false)
   }
 };

const handleDeleteList = async (listIdToDelete:string) => {
  
   console.log("update list click")
   try {
    setLoading(true)
     
      const res =await dispatch(deleteList({listId:listIdToDelete}))
 
       if(res?.meta.requestStatus=="rejected"){
         toast.error("rejected error " +res?.payload as string);
       }
       else if (res?.meta.requestStatus=="fulfilled"){
         toast.success("List Deleted");
         if(typeof email === "string"){
          dispatch(fetchLists(email))
      }
       }
      

   } catch (error: any) {
    console.log(error)
       toast.error("Error",error.message)
   }
   finally{
     setLoading(false)
   }
 };


return {
   visible,
   setVisible,
   handleChange,
   title,
   loading,
   updateTitle,
   selectedTheme,
   handleAddList,
   handleUpdateList,
   handleDeleteList,
   handleThemeSelect,
}
}

