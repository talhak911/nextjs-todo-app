"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { changePassword } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export const useChangePassword = () => {
  const email = useSession().data?.user?.email;
  const router = useRouter();

  const dispatch: AppDispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    console.log("change Button click");
    if (!formValues.password) {
      toast.error("enter you password");
    } else if (formValues.newPassword.length < 6) {
      toast.error("Password should be 6 charaters long");
    } else if (formValues.newPassword !== formValues.confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        setLoading(true);

        if (email) {
          const res = await dispatch(
            changePassword({ password: formValues.newPassword, email: email })
          );

          if (res?.meta.requestStatus == "rejected") {
            toast.error(res?.payload?.message as string);
          } else {
            toast.success(res?.payload?.message as string);
            router.push("/");
          }
        } else {
          toast.error("email not found refresh the page");
        }
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    formValues,
    handleChange,
    handleChangePassword,
    loading,
    error,
  };
};
