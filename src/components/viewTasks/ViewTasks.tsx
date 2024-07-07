"use client";

import { useViewTasks } from "./useViewTasks";

export default function ViewTasks() {
  const { tasks,list } = useViewTasks();

  return (
    <div className="flex flex-col">
      <h1>{list}</h1>
      {tasks.map((task, index) => {
        return (
          <div key={index}>
            {task.title}
          </div>
        );
      })}
    </div>
  );
}
