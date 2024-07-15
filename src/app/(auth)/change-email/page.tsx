"use client";
import Link from "next/link";
import { useChangeEmail } from "./useChangeEmail";

export default function VerifyEmail() {
  const { verified, error, verifyUserEmail } = useChangeEmail();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl text-vintageGardenPrimary">Verify Email</h1>

      {verified ? (
        <div>
          <h2 className="text-2xl text-vintageGardenPrimary">Email Verified</h2>
          <Link href="/sign-in">
            <span className="text-blue-500">Login</span>
          </Link>
        </div>
      ) : error ? (
        <div className="mt-3">
          <h2 className="text-2xl bg-cosmicSymphonyAccent">{error}</h2>
        </div>
      ) : (
        <button
          onClick={verifyUserEmail}
          className="mt-4 px-4 py-2 bg-vintageGardenAccent font-semibold text-vintageGardenPrimary rounded"
        >
          Click here
        </button>
      )}
    </div>
  );
}
