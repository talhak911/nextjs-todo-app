"use client";
import CustomInput from "../customInput/CustomInput";
import { useAddTask } from "./useAddTask";

export default function AddTask() {
  const { title, handleChange, handleAddTask, loading, theme, listName } =
    useAddTask();

  return (
    <div>
      <h1
        className={`flex justify-center w-full text-center  text-4xl md:text-5xl  xl:text-[124px] xl:leading-[139.98px] xl:mt-[16px] mb-[24px] text-${theme}Primary font-bold font-stint`}
      >
        {listName} <span className={`text-${theme}Accent`}>.</span>
      </h1>
      <div className={`flex gap-3 items-center justify-center `}>
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
          className={`rounded-full px-2 py-2 xl:px-[12px] xl:py-[8px] xl:text-[30px] md:w-[150px] bg-${theme}Accent font-medium`}
        >
          {loading ? "adding.." : "Add"}
        </button>
      </div>
    </div>
  );
}
