"use client";

import { useTasks } from "./useTasks";

export default function ViewTasks() {
  const { tasks,loading,handleAddTask,handleDeleteTask} = useTasks();

  return (
    <div className="flex flex-col">
     
      {tasks.map((task) => {
        return (
          <div 
          className="flex justify-between"
          key={task.id}>
            <div className="flex items-center gap-3">
              <input
              className=" size-5"
              defaultChecked={task.isCompleted}
              onClick={()=>{
                handleAddTask({taskId:task.id,status:!task.isCompleted})}}
              type="checkbox"  />
              <span className="text-3xl">{task.title}</span>
            </div>

            <button
            onClick={()=>{handleDeleteTask({taskId:task.id})}}
          
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
