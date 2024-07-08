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
    listName
  } = useAddTask();
  return (
    <div>
      <h1 className="text-center text-3xl">{listName}</h1>
          <div className="flex  gap-3 items-center justify-center  p-9">
          
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
           className=" px-4 py-3 bg-coastal-sunrise-accent rounded-full">
              {loading ?"adding.." :"Add List"}
            </button>
      
          </div>
       
    
    </div>
  );
}
