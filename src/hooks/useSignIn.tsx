import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const useSignIn = (callbackUrl: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("sing in btuotn click")
    try {
      setLoading(true);
    //   setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError(res.error);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message || "An error occurred");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("google", { callbackUrl });
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    formValues,
    handleChange,
    handleSignIn,
    handleGoogleSignIn,
    loading,
    error,
  };
};
