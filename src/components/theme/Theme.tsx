"use client";
import { ThemeIcon } from "../../../public/assets/icons/themeIcon";
import { useTheme } from "./useTheme";

export const Theme = () => {
  const { changeTheme } = useTheme();
  return (
    <button onClick={changeTheme}>
      <ThemeIcon />
    </button>
  );
};
