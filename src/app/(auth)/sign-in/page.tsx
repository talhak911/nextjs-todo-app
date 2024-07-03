"use client";

import CustomInput from "@/components/signUp/CustomInput";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import googleIcon from "@/../public/google.png"
import { useSignIn } from "@/hooks/useSignIn";
export const LoginForm = () => {
 
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const {
    formValues,
    handleChange,
    handleSignIn,
    handleGoogleSignIn,
    loading,
    error,
  } = useSignIn(callbackUrl);
  return (
    <div className="flex items-center justify-center min-h-screen bg-vintage-garden-background">
    <div className="w-full p-5 md:mt-0 sm:max-w-[330px] xl:p-0">
      <div className="space-y-4 md:space-y-6">
        <div>
          {error && (
            <p className="text-center bg-red-300 py-4 mb-6 rounded">
              {error}
            </p>
          )}
          
          <div className="flex flex-col gap-3">
          <CustomInput
          label="Email"
          type="text"
          value={formValues.email}
          onChange={handleChange}
          name="email"
          />
          
          <CustomInput
          label="Password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          name="password"
          />

            <div>
            <button
           className="mt-3 flex items-center justify-center h-10 gap-2 w-full bg-coastal-sunrise-accent rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm "
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
            onClick={(e)=>{handleSignIn(e)}}
       
            className="mt-2 w-full bg-coastal-sunrise-accent rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
            </div>


          </div>         
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default LoginForm