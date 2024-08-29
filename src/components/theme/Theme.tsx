"use client";
import Image from "next/image";
import { ThemeIcon } from "../../../public/assets/icons/themeIcon";
import { useTheme } from "./useTheme";
import themeImg from "../../../public/assets/images/theme.png"

export const Theme = () => {
  const { changeTheme } = useTheme();
  return (
    <button className="p-[24px]" onClick={changeTheme}>
 <Image
    // layout="responsive" 
    // objectFit="contain" 
 className=" xl:size-[48px]  size-[40px]" src={themeImg} height={100} width={100} alt="theme icon"/>
     
    </button>
  );
};
