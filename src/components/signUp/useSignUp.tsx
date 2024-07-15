import { SignUpFormType, SignUpRequest } from "@/types/types";
import { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { fetchUserData, registerUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import toast from "react-hot-toast";
import { getSession, signIn } from "next-auth/react";

export const useSignUp = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const [signUpform, setSignupForm] = useState<SignUpFormType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signUpResponse } = useAppSelector((state) => state.auth);
  const response = signUpResponse?.message;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({ ...signUpform, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    if (signUpform.name.length < 2) {
      toast.error("Name should be minimum 2 characters long");
    } else if (!signUpform.email.endsWith(".com")) {
      toast.error("Email should be valid");
    } else if (signUpform.password !== signUpform.confirmPassword) {
      toast.error("Password do no match");
    } else if (signUpform.password.length < 6) {
      toast.error("Password should be 6 charaters long");
    } else {
      const toSubmit: SignUpRequest = {
        name: signUpform.name,
        email: signUpform.email,
        password: signUpform.password,
      };
      await dispatch(registerUser(toSubmit));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signIn("google");
      if (res?.ok) {
        const session = await getSession();
        const email = session?.user?.email;
        if (email) {
          await dispatch(fetchUserData(email));
        }
      }
    } catch (error: any) {
      toast.error("Error logging in");
    }
  };

  return {
    handleChange,
    handleSignUp,
    handleGoogleSignIn,
    signUpform,
    loading,
    response,
  };
};
