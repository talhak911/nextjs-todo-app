"use client";
import { useAppDispatch } from "@/hooks/useStore";
import {
  addList,
  deleteList,
  fetchLists,
  updateList,
} from "@/redux/slices/listSlice";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useListCrud = ({
  update,
  listTitle,
}: {
  update?: boolean;
  listTitle?: string;
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string>();
  const [theme, setTheme] = useState("");
  const email = useSession().data?.user?.email;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (update && listTitle) {
      setTitle(listTitle);
    }
  }, [update, listTitle]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleThemeSelect = (themeValue: string, themeName: string) => {
    setTheme(themeValue);
    setSelectedTheme(themeName);
  };

  const handleAddList = async () => {
    try {
      setLoading(true);
      if (title.length < 3) {
        toast.error("List name too short");
      } else if (!selectedTheme) {
        toast.error("Please select a theme");
      } else {
        if (typeof email === "string") {
          const res = await dispatch(
            addList({ email: email, theme: theme, title: title })
          );

          if (res?.meta.requestStatus == "rejected") {
            toast.error(( res?.payload) as string);
          } else if (res?.meta.requestStatus == "fulfilled") {
            setSelectedTheme("");
            setTitle("");
            setVisible(false);
            toast.success("List add");
            if (typeof email === "string") {
              dispatch(fetchLists(email));
            }
          }
        }
      }
    } catch (error: any) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateList = async (listIdToUpdate: string) => {
    try {
      setLoading(true);
      if (title.length < 3) {
        toast.error("List name too short");
      } else {
        const res = await dispatch(
          updateList({ listId: listIdToUpdate, theme: theme, title: title })
        );

        if (res?.meta.requestStatus == "rejected") {
          toast.error((res?.payload) as string);
        } else if (res?.meta.requestStatus == "fulfilled") {
          setSelectedTheme("");
          setTitle("");
          toast.success("List updated");

          if (typeof email === "string") {
            dispatch(fetchLists(email));
          }
        }
      }
    } catch (error: any) {
      toast.error("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteList = async (listIdToDelete: string) => {
    try {
      setLoading(true);

      const res = await dispatch(deleteList({ listId: listIdToDelete }));

      if (res?.meta.requestStatus == "rejected") {
        toast.error((res?.payload) as string);
      } else if (res?.meta.requestStatus == "fulfilled") {
        toast.success("List Deleted");
        if (typeof email === "string") {
          dispatch(fetchLists(email));
        }
      }
    } catch (error: any) {
      toast.error("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    setVisible,
    handleChange,
    handleAddList,
    handleUpdateList,
    handleDeleteList,
    handleThemeSelect,
    selectedTheme,
    visible,
    title,
    loading,
  };
};
