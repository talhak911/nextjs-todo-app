"use client";

import { useTasks } from "./useTasks";

export default function Tasks({theme}:{theme?:string}) {
  const { tasks,loading,handleAddTask,handleDeleteTask} = useTasks();
if(tasks?.length<1){
  return(
    <div>
      <h2>No tasks</h2>
    </div>
  )
}
  return (
    <div className="flex flex-col mt-6 ">
     
      {tasks?.map((task) => {
        return (
          <div 
          className="flex justify-between items-center"
          key={task?.id}>
            <div className="flex items-center gap-3">
              <input
              className=" size-5"
              defaultChecked={task?.isCompleted}
              onClick={()=>{
                handleAddTask({taskId:task?.id,status:!task?.isCompleted})}}
              type="checkbox"  />
              <div className="relative w-fit">
               <span className="relative z-10 font-semibold text-3xl"> {task?.title}</span>
                <span className={`absolute left-0 right-0 bottom-2 h-[4px] bg-${theme}Accent z-0`}></span>
              </div>

              {/* <Link 
           
           href={`/tasks?listId=${list?.id}&listName=${list?.title}&theme=${list?.theme}`} 
           className="relative text-3xl w-fit"
         >
           <span className="relative z-10">{list?.title}</span>
           <span className="absolute left-0 right-0 bottom-2 h-[4px] bg-vintage-garden-accent z-0"></span>
         </Link> */}

            </div>

            <button
            className=" px-3 py-2 bg-red-500"
            onClick={()=>{handleDeleteTask({taskId:task?.id})}}
          
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
