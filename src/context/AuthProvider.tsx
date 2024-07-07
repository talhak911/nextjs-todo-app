'use client'
import SyncSession from "@/components/syncSession/SyncSession";
import { SessionProvider } from "next-auth/react";

export const AuthProvider=({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) =>{
    return (
        <SessionProvider > 
          <SyncSession/>
          {children} 
          </SessionProvider>
    );
  }
  