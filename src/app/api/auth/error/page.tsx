"use client"
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ErrorPage: NextPage = () => {
  const router = useParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { error } = router;
    if (typeof error === "string") {
      setError(error);
    }
  }, [router.query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Sign In Error</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-red-500">An unknown error occurred. Please try again.</p>
      )}
      {/* <button onClick={() => router.push("/auth/signin")} className="mt-4 bg-blue-500 text-white p-2 rounded-md">
        Back to Sign In
      </button> */}
    </div>
  );
};

export default ErrorPage;
