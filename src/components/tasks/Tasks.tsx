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
    <div className="flex flex-col  gap-[14px] mt-5 xl:mt-[49px] ">
      {tasks?.map((task) => {
        return (
          <div
            className="flex flex-wrap gap-3 justify-between items-center"
            key={task?.id}
          >
            <div className={`flex accent-${theme}Accent items-end gap-[24px]`}>
              <input
                className={`xl:mb-2  w-6 h-6 lg:w-8 lg:h-8 appearance-none border-2 xl:border-[5px] border-${theme}Accent rounded-md  relative
    checked:before:content-['✔'] checked:before:text-${theme}Primary checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:text-2xl
  `}
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
                <span className="relative z-10 font-semibold  text-3xl xl:text-5xl xl:leading-[83px]">
                  {task?.title}
                </span>
                <span
                  className={`absolute left-0 right-0 bottom-2 h-[4px] xl:h-[20px] bg-${theme}Accent z-0`}
                ></span>
              </div>
            </div>

            <button
              className=" px-3 py-2 xl:px-[24px] xl:py-[12px]  xl:text-2xl bg-rusticCharmPrimary text-white rounded-full text-sm "
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
