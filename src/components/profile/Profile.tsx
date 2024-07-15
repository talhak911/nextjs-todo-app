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
    <div className="flex flex-col gap-3 items-center ">
      <label className="relative cursor-pointer" htmlFor="img">
        <div className=" rounded-full overflow-hidden  size-24">
          <Image
            className="h-full w-full "
            src={image || profile}
            height={50}
            width={50}
            alt="profile picture"
          />
        </div>
        <div className="absolute right-0 bottom-1  z-30">
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

      <h4 className=" ">Profile Photo</h4>

      <div className="space-y-3 w-[300px]">
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
      <Link
        href={"/change-password"}
        className={`mt-3 border-4 border-${theme}Accent rounded-full py-2 px-3 w-44`}
      >
        change password
      </Link>
      <button
        disabled={loading}
        onClick={() => {
          handleSave();
        }}
        className={`bg-${theme}Accent rounded-full px-3 py-2 w-44`}
      >
        {loading ? "Loading" : " Save Changes"}
      </button>
    </div>
  );
};
