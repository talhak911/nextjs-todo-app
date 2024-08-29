"use client";
import React from "react";
import { useProfile } from "./useProfile";
import profile from "@/../public/assets/images/profile.png";
import Image from "next/image";
import CustomInput from "../customInput/CustomInput";
import Link from "next/link";
import { EditIcon } from "../../../public/assets/icons/editIcon";

export const Profile = ({ theme }: { theme?: string }) => {
  const {
    handleSave,
    onChangeEmail,
    onChangeName,
    onChangeImage,
    emailInput,
    image,
    loading,
    name,
  } = useProfile();

  return (
    <div className="flex flex-col  items-center ">
      <label className="relative cursor-pointer" htmlFor="img">
        <div className=" rounded-full overflow-hidden  size-24 xl:size-[156px]">
          <Image
            className="h-full w-full "
            src={image || profile}
            height={50}
            width={50}
            alt="profile picture"
          />
        </div>
        <div className="absolute right-0 bottom-1 xl:bottom-3 z-30">
          <EditIcon />
          <input
            hidden
            id="img"
            name="img"
            accept="png, jpg"
            type="file"
            onChange={(e) => {
              onChangeImage(e);
            }}
          />
        </div>
      </label>

      <h4 className="mt-[11px] text-lg xl:text-[30px] xl:leading-[39px]">
        Profile Photo
      </h4>

      <div className="space-y-3 xl:space-y-[36px] sm:w-[300px] xl:w-[555px]">
        <CustomInput
          label="Name"
          type="text"
          theme={theme}
          value={name}
          onChange={(e) => {
            onChangeName(e);
          }}
          name="Name"
        />

        <CustomInput
          label="Email"
          type="email"
          theme={theme}
          value={emailInput}
          onChange={(e) => {
            onChangeEmail(e);
          }}
          name="email"
        />
      </div>
      <div className="mt-4 flex flex-col xl:mt-[69px] gap-3 xl:gap-[36.2px] xl:text-[30px]">
        <Link
          href={`/change-password?theme=${theme}`}
          className={`mt-3 border-4 xl:border-[5px] border-${theme}Accent w-full xl:px-[19px] xl:py-[12px] rounded-full py-2 px-3 max-w-44 xl:max-w-[318px] xl:leading-[39px]`}
        >
          Change Password
        </Link>
        <button
          disabled={loading}
          onClick={() => {
            handleSave();
          }}
          className={`bg-${theme}Accent rounded-full px-3 py-2 xl:px-[24px] xl:py-[12px] max-w-44 xl:max-w-[318px]`}
        >
          {loading ? "Loading" : " Save Changes"}
        </button>
      </div>
    </div>
  );
};
