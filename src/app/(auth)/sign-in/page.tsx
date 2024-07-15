import SignIn from "@/components/signIn/SignIn";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to start organizing your tasks.",
  openGraph: {
    title: "Sign in - Todo App",
    description: "Sign in to start organizing your tasks.",
    url: `${process.env.DOMAIN}/sign-in`,
  },
};

export default function SignInPage() {
  return(
    <Suspense>
    <SignIn />
    </Suspense>
    )
}
