"use client";

import CustomInput from "@/components/customInput/CustomInput";
import React from "react";
import Link from "next/link";
import { useSignUp } from "./useSignUp";

export default function SignUp() {
  const { handleChange,signUpform,handleSignUp, loading, response} =useSignUp()
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-vintage-garden-background">
      <div className="w-full p-5  md:mt-0 sm:max-w-[330px] xl:p-0">
        <div className="space-y-4 md:space-y-6">
          <CustomInput
            label="Name"
            name="name"
            type="text"
            value={signUpform.name}
            onChange={handleChange}
          />
          <CustomInput
            label="Email"
            name="email"
            type="email"
            value={signUpform.email}
            onChange={handleChange}
          />
          <CustomInput
            label="Password"
            name="password"
            type="password"
            value={signUpform.password}
            onChange={handleChange}
          />
          <CustomInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={signUpform.confirmPassword}
            onChange={handleChange}
          />
       
            {response && <p className="text-sm  text-red-500"> {response}</p>}
          <button
          onClick={handleSignUp}
            disabled={loading=='pending'}
            className="w-full bg-coastal-sunrise-accent rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center "
          >
    
            {loading === 'pending'? 'Creating account...' : 'Create an account'} 
          </button>
          
          <p className="text-sm font-light ">
            Already have an account?
            <Link
              href="/sign-in"
              className="font-medium text-primary-600  hover:underline"
            >
              Login here
            </Link>

            
          </p>
        
        </div>
      </div>
    </div>
  );
}
