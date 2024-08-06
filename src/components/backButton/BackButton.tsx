"use client"
import { BackIcon } from "../../../public/assets/icons/backIcon";
import { useBackButton } from "./useBackButton";

export const BackButton = () => {
  const { back } = useBackButton();
  return (
    <button
      onClick={() => {
        back();
      }}
    >
      <BackIcon />
    </button>
  );
};
