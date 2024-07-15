import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useVerifyEmail = () => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const token = useSearchParams().get("token");
  const verifyUserEmail = async () => {
    try {
      if (token) {
        await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
      } else {
        setError("NO token");
      }
    } catch (error: any) {
      setError(error.message as string);
    }
  };

  return {
    verifyUserEmail,
    error,
    verified,
  };
};
