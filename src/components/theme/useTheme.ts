"use client";
import { THEME } from "@/constants/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const [count, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let params;
    const theme = localStorage.getItem("theme");
    if (theme) {
      params = new URLSearchParams({ theme: theme });
    } else {
      params = new URLSearchParams({ theme: "vintageGarden" });
    }

    router.push(`/?${params.toString()}`);
  }, [router]);

  const changeTheme = () => {
    const params = new URLSearchParams({ theme: THEME[count] });
    localStorage.setItem("theme", THEME[count]);
    router.push(`/?${params.toString()}`);
    setCount(count + 1);
    if (count === 8) {
      setCount(0);
    }
  };

  return {
    changeTheme,
  };
};
