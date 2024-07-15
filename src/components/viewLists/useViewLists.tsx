"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchLists } from "@/redux/slices/listSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useViewLists = () => {
  const email = useSession().data?.user?.email;
  const lists = useAppSelector((state) => state.lists.lists);
  const loading = useAppSelector((state) => state.lists.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof email === "string") {
      dispatch(fetchLists(email));
    }
  }, [dispatch, email]);

  return {
    lists,
    email,
    loading,
  };
};
