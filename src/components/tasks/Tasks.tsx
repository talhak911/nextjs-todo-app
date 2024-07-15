"use client";
import { useTasks } from "./useTasks";

export default function Tasks({ theme }: { theme?: string }) {
  const { tasks, handleUpdateTask, handleDeleteTask } = useTasks();

  if (tasks?.length < 1) {
    return (
      <div>
        <p className="p-5">...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col mt-6 gap-3 ">
      {tasks?.map((task) => {
        return (
          <div className="flex justify-between items-center" key={task?.id}>
            <div className="flex items-center gap-3">
              <input
                className="size-5"
                defaultChecked={task?.isCompleted}
                onClick={() => {
                  handleUpdateTask({
                    taskId: task?.id,
                    status: !task?.isCompleted,
                  });
                }}
                type="checkbox"
              />
              <div className="relative w-fit">
                <span className="relative z-10 font-semibold  text-xl md:text-3xl">
                  {task?.title}
                </span>
                <span
                  className={`absolute left-0 right-0 bottom-2 h-[4px] bg-${theme}Accent z-0`}
                ></span>
              </div>
            </div>

            <button
              className=" px-3 py-2 bg-rusticCharmPrimary text-white rounded-full text-sm "
              onClick={() => {
                handleDeleteTask({ taskId: task?.id });
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
