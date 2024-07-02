"use client";

import CustomInput from "@/components/signUp/CustomInput";
import { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "@/redux/slices/signUpSlice";
import { SignUpForm } from "@/types/types";
import { registerUser } from "@/redux/slices/authSlice";


export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const {signUpform,loading,error} = useSelector((state: RootState) => state.signUp);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name as keyof SignUpForm, value }));
  };
  const handleSubmit = ()=>{
    console.log("button submit clik")
    dispatch(registerUser(signUpform))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-vintage-garden-background">
      <div className="w-full p-5  md:mt-0 sm:max-w-[330px] xl:p-0">
        <div className="space-y-4 md:space-y-6">
        <div>
    <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900">
      Email
    </label>
    <input
      type='text'
      name='email'
      id='email'
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      //placeholder={`Enter your ${label.toLowerCase()}`}
      // value={value}
      // onChange={onChange}
      required
    />
  </div>

<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
      Email
    </label>
          <input
           
            name="password"
            type="password"
            value={signUpform.password}
            onChange={handleChange}
          />
          
            {error && <p className="text-sm  text-red-500"> {error}</p>}
          <button
          onClick={handleSubmit}
          
            disabled={loading=='pending'}
            className="w-full bg-coastal-sunrise-accent rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center "
            //disabled={loading}
          >
    
            {loading === 'pending'? 'Creating account...' : 'Create an account'} 
          </button>
          
          <p className="text-sm font-light ">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-primary-600  hover:underline"
            >
              Login here
            </a>

            
          </p>
        
        </div>
      </div>
    </div>
  );
}
