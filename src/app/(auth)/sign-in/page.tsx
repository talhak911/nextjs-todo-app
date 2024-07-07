"use client";
import CustomInput from "@/components/customInput/CustomInput";
import Image from "next/image";
import googleIcon from "@/../public/google.png";
import { useSignIn } from "@/app/(auth)/sign-in/useSignIn";

const SignIn = () => {
  const {
    formValues,
    handleChange,
    hidePassword,
    onClickForget,
    handleForgetPassword,
    handleSignIn,
    handleGoogleSignIn,
    loading,
  } = useSignIn();
  return (
    <div className="flex items-center justify-center min-h-screen bg-vintage-garden-background">
      <div className="w-full space-y-3 p-5 md:mt-0 sm:max-w-[330px] ">
        <CustomInput
          label={hidePassword ? "Email to send verification token" : "Email"}
          type="text"
          value={formValues.email}
          onChange={handleChange}
          name="email"
        />

        {!hidePassword && (
          <CustomInput
            label="Password"
            type="password"
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
            className=" flex items-center justify-center h-10 gap-2 w-full bg-coastal-sunrise-accent rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm "
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
            className=" w-full bg-coastal-sunrise-accent rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? "Loading..." : hidePassword ? "Send Email" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
