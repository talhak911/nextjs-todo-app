"use client";

import React from "react";
import { useProfile } from "./useProfile";
import Image from "next/image";
import CustomInput from "../customInput/CustomInput";
import Link from "next/link";

export const Profile = () => {
  const {
    user,

    handleSave,

  //  onChangeEmail,
    onChangeName,
    image,
    loading,
    name,
    onChangeImage,
  } = useProfile();
  
  return (
    <div className="flex flex-col gap-3 items-center ">
  <div className="gap-3  items-center flex flex-col">
                  <div className="rounded-full overflow-hidden size-24">
                    <Image
                      className="h-full w-full "
                      src={image || ""}
                      height={50}
                      width={50}
                      alt="profile picture"
                    />
               
                  </div>
                  <input
                    type="file"
                    onChange={(e) => {
                      onChangeImage(e);
                    }}
                  />

                  <h4 className=" ">Profile Photo</h4>
                </div>

                <CustomInput
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    onChangeName(e);
                  }}
                  name="Name"
                />

                <CustomInput
                  label="Email"
                  type="email"
                  onChange={(e) => {
                //    onChangeEmail(e);
                  }}
               
                  name="email"
                />
            <h1>{user?.name}</h1>
                <Link 
                href={"/change-password"}
                className="mt-3 border-4 border-slate-700 rounded-full py-2 px-3 w-44">
                  change password
                </Link>
                <button 
                disabled={loading}
                  onClick={()=>{handleSave()}}
                className="bg-yellow-500 rounded-full px-3 py-2 w-44">
                 {loading?"Loading":" Save Changes"}
                </button>
    </div>
  );
};
