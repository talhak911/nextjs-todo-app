"use client";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

export const SignOut = ({ children }: { children: ReactNode }) => (
  <button onClick={() => signOut()}>{children}</button>
);
