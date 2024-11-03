"use client";
import CustomInput from "@/components/customInput/CustomInput";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSignUp } from "./useSignUp";
import googleIcon from "@/../public/assets/icons/google.png";
import { INPUTS } from "@/constants/signUpInputs";

export default function SignUp() {
  const {
    handleChange,
    handleGoogleSignIn,
    handleSignUp,
    signUpform,
    loading,
    response,
  } = useSignUp();

  return (
    <div className="flex items-center justify-center py-4 min-h-screen bg-vintage-garden-background">
      <div className="w-full p-5 xl:p-0  md:mt-0 max-w-80 md:max-w-96 xl:max-w-[447px]">
        <div className="space-y-4 md:space-y-4 xl:space-y-[32px]">
          <div className="flex items-center justify-center gap-0 text-4xl md:text-5xl font-bold xl:text-[90px]  xl:mb-[90px]">
            <h1 className="  text-vintageGardenPrimary   text-center font-stint inline-flex">
              Sign Up
            </h1>
            <span className=" text-vintageGardenAccent -ml-1  xl:-ml-3">.</span>
          </div>

          {INPUTS.map((field) => (
            <CustomInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              theme="vintageGarden"
              value={signUpform[field.name]}
              onChange={handleChange}
            />
          ))}
          {response && (
            <p className="text-sm text-rusticCharmPrimary text-center">
              {response}
            </p>
          )}
          <div className="flex flex-col gap-[19px] xl:pt-[32px] ">
            <button
              className=" flex items-center justify-center h-10 gap-[10px] w-full xl:h-[72px]  border-4 xl:border-[5px]  text-vintageGardenAccent font-bold border-vintageGardenAccent rounded-full text-sm xl:text-[30px] "
              onClick={handleGoogleSignIn}
            >
              <Image
                src={googleIcon}
                height={48}
                width={48}
                className="size-[28px] xl:size-[48px]"
                alt="login with google"
              />
              Sign Up with Google
            </button>

            <button
              onClick={handleSignUp}
              disabled={loading == "pending"}
              className="w-full bg-vintageGardenAccent rounded-full focus:ring-4 h-10 xl:h-[72px] focus:outline-none focus:ring-primary-300 font-medium text-sm xl:text-[30px] text-center "
            >
              {loading === "pending"
                ? "Creating account..."
                : "Create an account"}
            </button>
          </div>
        </div>
        <p className="text-sm font-light xl:text-[20px] mt-[16px]">
          Already have an account?&nbsp;
          <Link
            href="/sign-in"
            className=" text-vintageGardenAccent font-semibold  underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
