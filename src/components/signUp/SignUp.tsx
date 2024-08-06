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
    <div className="flex items-center justify-center min-h-screen bg-vintage-garden-background">
      <div className="w-full p-5  md:mt-0 sm:max-w-[330px] xl:p-0">
        <div className="space-y-4 md:space-y-4">
          <div className="flex items-center justify-center gap-0 text-3xl md:text-4xl font-bold">
            <h1 className="  text-vintageGardenPrimary   text-center font-stint inline-flex">
              Sign Up
            </h1>
            <span className=" text-vintageGardenAccent -ml-1">.</span>
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

          <button
            className=" flex items-center justify-center h-10 gap-2 w-full border-4 text-vintageGardenAccent font-bold border-vintageGardenAccent rounded-full text-sm "
            onClick={handleGoogleSignIn}
          >
            <Image
              src={googleIcon}
              height={22}
              width={22}
              alt="login with google"
            />
            Continue with Google
          </button>

          <button
            onClick={handleSignUp}
            disabled={loading == "pending"}
            className="w-full bg-vintageGardenAccent rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center "
          >
            {loading === "pending"
              ? "Creating account..."
              : "Create an account"}
          </button>

          <p className="text-sm font-light text-center ">
            Already have an account? &nbsp;
            <Link
              href="/sign-in"
              className=" text-vintageGardenAccent font-semibold  hover:underline "
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
