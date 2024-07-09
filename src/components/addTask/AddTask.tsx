"use client"
import {clsx} from "clsx"
import { THEMES } from "@/constants/themes";
import CustomInput from "../customInput/CustomInput";
import { useAddTask } from "./useAddTask";
import { COLORS} from "@/constants/colors";

export default function AddTask() {
  const {
  
    title,
    handleChange,
    handleAddTask,
    loading,
    theme,
    listName
  } = useAddTask();
  // const backgroundColor = COLORS[theme] as keyof ColorType || theme
  // console.log(backgroundColor)
  // if(!backgroundColor){
  //   return null
  // }
console.log(theme)

  return (
   
    <div className=""
    // style={{backgroundColor:`${backgroundColor}`}}
    >
      <h1 className=" text-3xl font-bold text-center ">{listName}</h1>
          <div className={`flex gap-3 items-center justify-center pt-8`}>
          
            <div className=" w-full">
            <CustomInput
              name="Task name"
              theme={theme}
              type="text"
              value={title}
              onChange={handleChange}
            />
            </div>

        
           <button 
           disabled={loading}
           onClick={()=>{handleAddTask()}}
          //  style={{
          //   backgroundColor :COLORS[theme+"Accent"]
          //  }}
           className={`rounded-full px-3 py-2 w-[150px] bg-${theme}Accent font-medium`}>
              {loading ?"adding.." :"Add List"}
            </button>
      
          </div>
       
    
    </div>
  );
}
