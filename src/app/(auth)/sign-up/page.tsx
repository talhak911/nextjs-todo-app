import SignUp from "@/components/signUp/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to start organizing your tasks.",
  openGraph: {
    title: "Sign Up - Todo App",
    description: "Create an account to start organizing your tasks.",
    url: `${process.env.DOMAIN}/sign-up`,
  },
};

export default function SignUpPage() {
  return <SignUp />;
}
