"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchLists } from "@/redux/slices/listSlice";
import { deleteTask, fetchTasks, updateTask } from "@/redux/slices/taskSlice";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useTasks = () => {
  const listId = useSearchParams().get("listId");
  const email = useSession().data?.user?.email;
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const dispatch = useAppDispatch();

  const handleUpdateTask = async ({
    taskId,
    status,
  }: {
    taskId: string;
    status: boolean;
  }) => {
    try {
      if (!listId) {
        toast.error("Select list to add task");
      } else {
        const res = await dispatch(updateTask({ taskId, status }));

        if (res?.meta.requestStatus == "rejected") {
          toast.error((res?.payload) as string);
        } else if (res?.meta.requestStatus == "fulfilled") {
          toast.success("Status changed");
          dispatch(fetchTasks(listId));
        }
      }
    } catch (error: any) {
      toast.error("Error");
    }
  };
  const handleDeleteTask = async ({ taskId }: { taskId: string }) => {
    try {
      if (!listId) {
        toast.error("Select list to add task");
      } else if (window.confirm("Are you sure you want to delete")) {
        const res = await dispatch(deleteTask({ taskId }));
        if (res?.meta.requestStatus == "rejected") {
          toast.error((res?.payload) as string);
        } else if (res?.meta.requestStatus == "fulfilled") {
          toast.success("Status changed");
          dispatch(fetchTasks(listId));
        }
      }
    } catch (error: any) {
      toast.error("Error");
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

    handleDeleteTask,
    handleUpdateTask,
  };
};
