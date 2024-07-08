"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchLists } from "@/redux/slices/listSlice";
import { deleteTask, fetchTasks, updateTask } from "@/redux/slices/taskSlice";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useTasks = () => {
  const [loading, setLoading] = useState(false);
  const listId = useSearchParams().get("listId");
  const email = useAppSelector((state) => state.auth.user?.email);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  //  const list = useAppSelector((state)=>{
  //    const listName =state.lists.lists.find((item)=>item.id === listId)

  //   return listName?.title
  //  })
  // console.log(list)
  const dispatch = useAppDispatch();

  const handleAddTask = async ({
    taskId,
    status,
  }: {
    taskId: string;
    status: boolean;
  }) => {
    console.log("add list click");
    try {
      setLoading(true);
      if (!listId) {
        toast.error("Select list to add task");
      } else {
        const res = await dispatch(updateTask({ taskId, status }));

        if (res?.meta.requestStatus == "rejected") {
          toast.error(("rejected error " + res?.payload) as string);
        } else if (res?.meta.requestStatus == "fulfilled") {
          toast.success("Status changed");
          dispatch(fetchTasks(listId));
        }
      }
    } catch (error: any) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteTask = async ({ taskId }: { taskId: string }) => {
    try {
      setLoading(true);

      if (!listId) {
        toast.error("Select list to add task");
      } else if (window.confirm("Are you sure you want to delete")) {
        console.log("confirmed");
      
        const res = await dispatch(deleteTask({ taskId }));

        if (res?.meta.requestStatus == "rejected") {
          toast.error(("rejected error " + res?.payload) as string);
        } else if (res?.meta.requestStatus == "fulfilled") {
          toast.success("Status changed");
          dispatch(fetchTasks(listId));
        }
      }
    } catch (error: any) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (listId && email) {
      dispatch(fetchTasks(listId));
      dispatch(fetchLists(email));
    }
  }, [dispatch, listId, email]);

  return {
    tasks,
    loading,
    handleDeleteTask,
    handleAddTask,
  };
};
