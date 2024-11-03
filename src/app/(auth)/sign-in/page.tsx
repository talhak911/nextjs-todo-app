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
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full p-5 xl:p-0 md:mt-0 max-w-80 md:max-w-96 xl:max-w-[447px] ">
        <div className="flex items-center justify-center gap-0   font-bold  text-4xl md:text-5xl xl:text-[90px]  xl:mb-[90px] mb-4">
          <h1 className=" text-vintageGardenPrimary text-center font-stint ">
            Sign In
          </h1>
          <span className=" text-vintageGardenAccent -ml-1 xl:-ml-3 ">.</span>
        </div>
        <Suspense>
          <SignIn />
        </Suspense>
      </div>
    </div>
  );
}
