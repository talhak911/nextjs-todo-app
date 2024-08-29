"use client";

import CustomInput from "@/components/customInput/CustomInput";

import { useChangePassword } from "./useChangePassword";
import { BackButton } from "@/components/backButton/BackButton";
import { SignOut } from "@/components/signOut/SignOut";
import { LogoutIcon } from "../../../../public/assets/icons/logout";
const ResetPassword = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const theme = searchParams?.theme as string;
  const { formValues, handleChange, handleChangePassword, loading } =
    useChangePassword();
  return (
    <div className={`min-h-screen bg-${theme}Background bg-dotted-pattern bg-dotted-size`}>
  <div
        className={`absolute w-full flex justify-between px-[24px] py-2 xl:p-[24px] backdrop-blur-[3px] text-${theme}Primary`}
      >
        <BackButton />
        <SignOut>
          <LogoutIcon />
        </SignOut>
      </div>
    <div
      className={`flex items-center justify-center min-h-screen`}
      >
       
      <div className="w-full p-5 md:mt-0 sm:max-w-[330px] xl:max-w-[447px] xl:p-0">
        <div className="space-y-4 md:space-y-6">
          <div>
            <div className="flex flex-col gap-3 xl:gap-[32px]">
              <CustomInput
                label="New Password"
                type="password"
                value={formValues.newPassword}
                onChange={handleChange}
                name="newPassword"
                theme={theme}
              />

              <CustomInput
                label="Confirm Password"
                type="password"
                value={formValues.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                theme={theme}
              />

              <div>
                <button
                  onClick={() => {
                    handleChangePassword();
                  }}
                  className={`mt-2 w-full xl:h-[63px]  bg-${theme}Accent rounded-full xl:text-[30px] xl:px-[24px] xl:py-[12px] font-medium text-sm px-5 py-2.5 text-center`}
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
                  </div>
  );
};

export default ResetPassword;
