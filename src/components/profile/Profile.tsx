"use client";
import pic from "@/../public/assets/images/pic.jpg";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import React from "react";
import { useProfile } from "./useProfile";
import Image from "next/image";
import CustomInput from "../customInput/CustomInput";

export const Profile = () => {
  const {
    user,
    isOpen,
    handleSave,
    setIsOpen,
    onChangeEmail,
    onChangeName,
    image,
    name,
    onChangeImage,
  } = useProfile();

  return (
    <div className="p-2 bg-white  flex gap-2  ">
      <div className="ml-auto">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Profile
        </button>
<button onClick={()=>{signOut()}}>signout</button>
        {isOpen && (
          <div className="bg-red-300 absolute inset-0  z-30 block h-full w-full">
            <div>
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Close
              </button>
              <div className="flex flex-col items-center mt-20 gap-5 font-sans">
                <h1 className="font-bold text-3xl">
                  Settings <span>.</span>
                </h1>
                <div className="gap-3  items-center flex flex-col">
                  <div className="rounded-full overflow-hidden size-24">
                    <Image
                      className="h-full w-full "
                      src={image || pic}
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
                    onChangeEmail(e);
                  }}
               
                  name="email"
                />
            <h1>{user?.name}</h1>
                <button 
              
                className="mt-3 border-4 border-slate-700 rounded-full py-2 px-3 w-44">
                  change password
                </button>
                <button 
                  onClick={()=>{handleSave()}}
                className="bg-yellow-500 rounded-full px-3 py-2 w-44">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
