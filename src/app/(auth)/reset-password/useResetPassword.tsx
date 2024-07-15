"use client";
import { useAppDispatch } from "@/hooks/useStore";
import { resetPassword } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const dispatch: AppDispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleReset = async () => {
    if (!token) {
      toast.error("Token missing make sure you came from email link");
    } else if (formValues.password.length < 6) {
      toast.error("Password should be 6 charaters long");
    } else if (formValues.password !== formValues.confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        setLoading(true);

        const res = await dispatch(
          resetPassword({ password: formValues.password, token: token })
        );

        if (res?.meta.requestStatus == "rejected") {
          toast.error(res?.payload?.message as string);
        } else {
          toast.success(res?.payload?.message as string);
          router.push("/sign-in");
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
    handleReset,
    loading,
    error,
  };
};
