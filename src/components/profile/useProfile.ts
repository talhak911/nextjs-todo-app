"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  fetchUserData,
  updateEmail,
  updateName,
} from "@/redux/slices/authSlice";
import { uploadImage } from "@/utils/uploadImage";
import { getSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state?.auth?.user);
  const [name, setName] = useState("");
  const [image, setImage] = useState<any>();
  const [file, setFile] = useState<File>();
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fun = async () => {
      const session = await getSession();
      const email = session?.user?.email;
      if (email) {
        await dispatch(fetchUserData(email));
      }
      if (user?.image) {
        setImage(user?.image);
      }
      if (user?.name) {
        setName(user?.name as string);
      }
      if (user?.email) {
        setEmailInput(user?.email as string);
      }
    };
    fun();
  }, [user?.image, user?.name,user?.email,dispatch]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (file && user?.email) {
        await uploadImage(user.email, file);

        toast.success("Updated Picture");
      }
      if (name !== user?.name) {
        const res = await dispatch(
          updateName({ name, email: user?.email as string })
        );
        if (res?.meta.requestStatus == "fulfilled") {
          toast.success("Name updated");
        }
      }
      if (emailInput !== user?.email) {
        const res = await dispatch(
          updateEmail({ email: user?.email as string, newEmail: emailInput })
        );
        if (res?.meta.requestStatus == "fulfilled") {
          toast.success("Verify your Email Address");
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    onChangeEmail,
    onChangeName,
    onChangeImage,
    handleSave,
    loading,
    emailInput,
    name,
    image,
  };
};
