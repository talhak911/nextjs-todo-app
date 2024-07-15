"use client";
import CustomInput from "../customInput/CustomInput";
import { useAddTask } from "./useAddTask";

export default function AddTask() {
  const { title, handleChange, handleAddTask, loading, theme, listName } =
    useAddTask();

  return (
    <div>
      <h1 className=" text-3xl md:text-4xl font-bold text-center font-stint ">
        {listName}
      </h1>
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
          onClick={() => {
            handleAddTask();
          }}
          className={`rounded-full px-2 py-2 md:w-[150px] bg-${theme}Accent font-medium`}
        >
          {loading ? "adding.." : "Add"}
        </button>
      </div>
    </div>
  );
}
