"use client"
import { useRouter } from "next/navigation";

export const useBackButton = () => {
  const router = useRouter();
  const back = () => {
    router.back();
  };
  return {
    back,
  };
};
