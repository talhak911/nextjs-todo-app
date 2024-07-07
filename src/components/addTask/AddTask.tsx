"use client"
import { THEMES } from "@/constants/themes";
import CustomInput from "../customInput/CustomInput";
import { useAddTask } from "./useAddTask";

export default function AddTask() {
  const {
  
    title,
    handleChange,
    handleAddTask,
    loading,

  } = useAddTask();
  return (
    <div>
    

  
        <div className=" bg-vintage-garden-background ">
         
          <div className="flex flex-col gap-3 items-center justify-center  p-9">
            <div className="w-full max-w-sm">
            <CustomInput
              name="Task name"
              type="text"
              value={title}
              onChange={handleChange}
            />
            </div>
          
     
        
           <button 
           disabled={loading}
           onClick={()=>{handleAddTask()}}
           className="mt-8 px-4 py-3 bg-coastal-sunrise-accent rounded-full">
              {loading ?"adding.." :"Add List"}
            </button>
      
          </div>
        </div>
    
    </div>
  );
}
