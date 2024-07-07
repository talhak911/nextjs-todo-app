"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import { addList, fetchLists } from "@/redux/slices/listSlice"
import { ChangeEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"

export const useAddLists=()=>{

   const dispatch = useAppDispatch()
   const [loading,setLoading]=useState(false)
   const [title,setTitle]=useState("")
   const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
   const [theme,setTheme]=useState("")
   const email = useAppSelector(state=>state.auth.user?.email)
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };
  
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
         toast.success("List add");

          
       }
     }  }

     // if (!res?.error) {
     //   toast.success("Correct login");
     //   router.push(callbackUrl);
     // } else {
     //   setError(res.error);
     // }
   } catch (error: any) {
   
       toast.error("Error")
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
   selectedTheme,
   handleAddList,
   handleThemeSelect,
}
}

