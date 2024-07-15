import axios from "axios";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useChangeEmail = () => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const token = useSearchParams().get("token");
  const email = useSearchParams().get("email");
  const verifyUserEmail = async () => {
    try {
      if (token && email) {
        await axios.post("/api/users/changeemail", { token, email });
        setVerified(true);
        await signOut();
      } else {
        setError("NO token");
      }
    } catch (error: any) {
      setError(error.message as string);
      console.log(error.response?.data);
    }
  };

  return {
    verifyUserEmail,
    error,
    verified,
  };
};
