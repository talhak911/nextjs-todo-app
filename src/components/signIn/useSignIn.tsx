"use client";
import { useAppDispatch } from "@/hooks/useStore";
import {
  fetchUserData,
  forgetPassword,
  signInUser,
} from "@/redux/slices/authSlice";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export const useSignIn = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "https://todo-app-talha.vercel.app";
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onClickForget = () => {
    setHidePassword(!hidePassword);
  };

  const handleForgetPassword = async () => {
    try {
      setLoading(true);
      if (!formValues.email.endsWith(".com")) {
        toast.error("Email should be valid");
      } else {
        const res = await dispatch(forgetPassword(formValues.email));
        if (res?.meta.requestStatus == "rejected") {
          toast.error(res?.payload?.message as string);
        } else if (res?.meta.requestStatus == "fulfilled") {
          toast.success("Email sent");
          router.push(callbackUrl);
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      if (!formValues.email.endsWith(".com")) {
        toast.error("Email should be valid");
      } else if (formValues.password.length < 3) {
        toast.error("Password too short");
      } else {
        const res = await dispatch(
          signInUser({
            callbackUrl: callbackUrl,
            email: formValues.email,
            password: formValues.password,
          })
        );
        if (res?.meta.requestStatus == "rejected") {
          toast.error(("rejected error " + res.payload) as string);
        } else if (res?.meta.requestStatus == "fulfilled") {
          toast.success("Correct login");
          router.push("/");
        }
      }

    } catch (error: any) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const res = await signIn("google"
         //{ callbackUrl }
        );
      if (res?.ok) {
        const session = await getSession();
        const email = session?.user?.email;
        if (email) {
          await dispatch(fetchUserData(email));
        }
      }
    } catch (error: any) {
      toast.error("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return {
    formValues,
    handleChange,
    handleSignIn,
    handleForgetPassword,
    handleGoogleSignIn,
    onClickForget,
    hidePassword,
    loading,
  };
};
