"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchUserData, updateName } from "@/redux/slices/authSlice";
import { uploadImage } from "@/utils/uploadImage";
import { getSession, useSession } from "next-auth/react";
//import { forgetPassword, updateProfile } from "@/redux/slices/authSlice";

import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state?.auth?.user);
  console.log("user isssssss", user);
  const userEmail = useSession().data?.user?.email;

  const [name, setName] = useState("");
  const [image, setImage] = useState<any>();
  const [file, setFile] = useState<File>();
  //const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fun = async () => {
      const session = await getSession();
      const email = session?.user?.email;
      if (email) {
        await dispatch(fetchUserData(email));
      }

      if (userEmail) {
        await dispatch(fetchUserData(userEmail));

        //   setImage(user?.image)
      }
      console.log("image is  dfd", user?.image);
     if(user?.image ){
        setImage(user?.image);
       
     }
     if (user?.name){
        setName(user?.name as string);
     }
    };
    fun();
  }, [userEmail, user?.image, user?.name]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
//   const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  //new changes
  // const handleImageUpload = async () => {
  //     if (file && user?.email) {
  //       await uploadImage(user.email, file);
  //       // Optionally, update user state with the new image URL or data
  //     }
  //   };
  //

  const handleSave = async () => {
    try {
      console.log("handle saves");
      setLoading(true);
      //new changes
      if (file && user?.email) {
        await uploadImage(user.email, file);
        // Optionally, update user state with the new image URL or data
        toast.success("Updated Picture");
      }
      //end
      if (name !== user?.name) {
        const res = await dispatch(
          updateName({ name, email: user?.email as string })
        );
        if (res?.meta.requestStatus == "fulfilled") {
          toast.success("Name updated");
        }
      }

      // else {
      //   const res = await dispatch((updateProfile({name,email})));
      //   if (res?.meta.requestStatus == "rejected") {
      //     toast.error(res?.payload?.message as string);
      //   } else if (res?.meta.requestStatus == "fulfilled") {
      //     toast.success("Email sent");

      //   }
      // }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    user,

    loading,

    //onChangeEmail,
    onChangeName,
    name,
    onChangeImage,
    image,
    handleSave,
  };
};
