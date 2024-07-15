"use client";

import CustomInput from "@/components/customInput/CustomInput";

import { useResetPassword } from "./useResetPassword";
const ResetPassword = () => {
  const { formValues, handleChange, handleReset, loading } = useResetPassword();
  return (
    <div className="flex items-center justify-center min-h-screen bg-vintage-garden-background">
      <div className="w-full p-5 md:mt-0 sm:max-w-[330px] xl:p-0">
        <div className="space-y-4 md:space-y-6">
          <div>
            <div className="flex flex-col gap-3">
              <CustomInput
                label="Password"
                type="password"
                theme="vintageGarden"
                value={formValues.password}
                onChange={handleChange}
                name="password"
              />

              <CustomInput
                label="Confirm Password"
                type="password"
                theme="vintageGarden"
                value={formValues.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />

              <div>
                <button
                  onClick={() => {
                    handleReset();
                  }}
                  className="mt-2 w-full bg-vintageGardenAccent rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center"
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

export default ResetPassword;
