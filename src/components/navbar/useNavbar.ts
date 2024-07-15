import { useSearchParams } from "next/navigation";

export const useNavbar = () => {
  const theme = useSearchParams().get("theme");
  return {
    theme,
  };
};
