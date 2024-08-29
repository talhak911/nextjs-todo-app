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
    <div className="flex items-center justify-center min-h-screen   md">
      <div className="w-full p-5 xl:p-0 md:mt-0 sm:max-w-[330px] xl:max-w-[447px] ">
        <div className="flex items-center justify-center gap-0   font-bold  text-3xl md:text-4xl xl:text-[90px]  xl:mb-[90px]">
          <h1 className=" text-vintageGardenPrimary text-center font-stint ">
            Sign In
          </h1>
          <span className=" text-vintageGardenAccent xl:-ml-3 ">.</span>
        </div>
       <div className="space-y-3 xl:space-y-[32px]">
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
       </div>

        <div className="flex justify-end">
          <button onClick={onClickForget} className="text-sm xl:text-[20px] xl:mt-[16px]">
            Forget Password{" "}
          </button>
        </div>
        <div className="xl:space-y-[19px] space-y-3 xl:mt-[64px]">
          <button
            className=" flex items-center justify-center h-10 xl:h-[72px] gap-3 w-full  border-4 xl:border-[5px] border-vintageGardenAccent rounded-full text-sm xl:text-[30px] "
            onClick={handleGoogleSignIn}
          >
            <Image
              src={googleIcon}
              height={48}
              width={48}
              className="size-[28px] xl:size-[48px]"
              alt="login with google"
            />
            Sign In with Google
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
            className=" w-full  xl:h-[72px] bg-vintageGardenAccent rounded-full  font-medium  text-sm xl:text-[30px] px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? "Loading..." : hidePassword ? "Send Email" : "Sign In"}
          </button>
        </div>
        <p className="text-sm font-light pt-4 text-center xl:text-[20px]">
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
