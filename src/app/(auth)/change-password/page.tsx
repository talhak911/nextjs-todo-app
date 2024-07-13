"use client";

import CustomInput from "@/components/customInput/CustomInput";

import { useChangePassword } from "./useChangePassword";
import { useEffect } from "react";
const ResetPassword = () => {


  const {
    formValues,
    handleChange,
handleChangePassword,
    loading
  } = useChangePassword();
  return (
    <div className="flex items-center justify-center min-h-screen bg-vintage-garden-background">
    <div className="w-full p-5 md:mt-0 sm:max-w-[330px] xl:p-0">
      <div className="space-y-4 md:space-y-6">
        <div>
         
          <div className="flex flex-col gap-3">
          <CustomInput
          label="Password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          name="password"
          />

          <CustomInput
          label="New Password"
          type="password"
          value={formValues.newPassword}
          onChange={handleChange}
          name="newPassword"
          />
          
          <CustomInput
          label="Confirm Password"
          type="password"
          value={formValues.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          />

            <div>

          <button
            onClick={()=>{handleChangePassword()}}
       
            className="mt-2 w-full bg-coastal-sunrise-accent rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? "Loading..." : "Change Password"}
          </button>
            </div>


          </div>         
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ResetPassword