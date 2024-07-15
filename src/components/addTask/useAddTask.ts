"use client";

import { useAppDispatch } from "@/hooks/useStore";
import { addTask, fetchTasks } from "@/redux/slices/taskSlice";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useAddTask = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const listId = useSearchParams().get("listId");
  const listName = useSearchParams().get("listName");
  const theme = useSearchParams().get("theme") || "vintage-garden";
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddTask = async () => {
    try {
      setLoading(true);
      if (title.length < 3) {
        toast.error("Task name too short");
      } else if (!listId) {
        toast.error("Select list to add task");
      } else {
        const res = await dispatch(addTask({ listId, title }));

        if (res?.meta.requestStatus == "rejected") {
          toast.error(("rejected error " + res?.payload) as string);
        } else if (res?.meta.requestStatus == "fulfilled") {
          setTitle("");
          toast.success("List add");
          dispatch(fetchTasks(listId));
        }
      }
    } catch (error: any) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAddTask,
    handleChange,
    title,
    loading,
    listName,
    theme,
  };
};
