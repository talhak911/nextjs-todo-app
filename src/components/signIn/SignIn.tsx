"use client";
import CustomInput from "@/components/customInput/CustomInput";
import Image from "next/image";
import googleIcon from "@/../public/assets/icons/google.png";
import { useSignIn } from "./useSignIn";
import Link from "next/link";

const SignIn = () => {
  const {
    handleChange,
    onClickForget,
    handleForgetPassword,
    handleSignIn,
    handleGoogleSignIn,
    hidePassword,
    formValues,
    loading,
  } = useSignIn();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full space-y-3 p-5 md:mt-0 sm:max-w-[330px] ">
        <div className="flex items-center justify-center gap-0 text-3xl md:text-4xl font-bold">
          <h1 className="  text-vintageGardenPrimary   text-center font-stint inline-flex">
            Sign In
          </h1>
          <span className=" text-vintageGardenAccent -ml-1">.</span>
        </div>
        <CustomInput
          label={hidePassword ? "Email to send verification token" : "Email"}
          type="text"
          theme="vintageGarden"
          value={formValues.email}
          onChange={handleChange}
          name="email"
        />

        {!hidePassword && (
          <CustomInput
            label="Password"
            type="password"
            theme="vintageGarden"
            value={formValues.password}
            onChange={handleChange}
            name="password"
          />
        )}

        <div className="flex justify-end">
          <button onClick={onClickForget} className="text-sm">
            Forget Password{" "}
          </button>
        </div>
        <div className="space-y-2">
          <button
            className=" flex items-center justify-center h-10 gap-3 w-full  border-4 border-vintageGardenAccent rounded-full text-sm "
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
            onClick={
              hidePassword
                ? () => {
                    handleForgetPassword();
                  }
                : () => {
                    handleSignIn();
                  }
            }
            className=" w-full bg-vintageGardenAccent rounded-full  font-medium  text-sm px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? "Loading..." : hidePassword ? "Send Email" : "Sign In"}
          </button>
        </div>
        <p className="text-sm font-light pt-4 text-center">
          Do not have an account? &nbsp;
          <Link
            href="/sign-up"
            className=" text-vintageGardenAccent font-semibold  hover:underline  "
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
