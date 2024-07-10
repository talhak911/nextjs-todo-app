"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchUserData, updateName } from "@/redux/slices/authSlice";
//import { forgetPassword, updateProfile } from "@/redux/slices/authSlice";

import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProfile=()=>{

    const dispatch = useAppDispatch()
    const user = useAppSelector(state=>state?.auth?.user)
    console.log("user isssssss",user)
    const [isOpen,setIsOpen]=useState(false)
    const [name,setName]= useState("")
    const [image,setImage]=useState("")
    const [file,setFile]=useState<File>()
    const [email,setEmail]=useState("")
    const [loading,setLoading]=useState(false)
    
useEffect(()=>{
    setName(user?.name as string)
    if(user?.email){
        dispatch(fetchUserData(user?.email))
    }
},[user])

    const onChangeName=(e:ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }
    const onChangeEmail=(e:ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
    }

    const onChangeImage=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
        const file = e.target.files[0]
        setFile(file)
        setImage(URL.createObjectURL(file))
        }

       
    }



    const handleSave =async()=>{
        try {
            console.log("handle saves")
            setLoading(true);
            if (name ===user?.name) {
              toast.error("name is same");
            } 
            else{

              const res = await dispatch((updateName({name,email:user?.email as string})));
             if (res?.meta.requestStatus == "fulfilled") {
                toast.success("Name updated");
              
              
            }
            }
            // else {
            //   const res = await dispatch((updateProfile({name,email})));
            //   if (res?.meta.requestStatus == "rejected") {
            //     toast.error(res?.payload?.message as string);
            //   } else if (res?.meta.requestStatus == "fulfilled") {
            //     toast.success("Email sent");
              
            //   }
            // }
          } catch (error) {
          } finally {
            setLoading(false);
          }
    }




    return{
        user,
        isOpen,
        setIsOpen,
        onChangeEmail,
        onChangeName,
        name,
        onChangeImage,
        image,
        handleSave
    }
}