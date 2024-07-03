"use client"

import {  getSession,  signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

  function AppBar() {

  const session = useSession()
  return (
    <div className="p-2 bg-gradient-to-b from-slate-800 to-slate-600 flex gap-2 ">
      <Link href={"/clientPage"}>Client Page</Link>
      <Link href={"/serverPage"}>Server Page</Link>
      <Link href={"/middlewareProtected"}>Middleware Protected Page</Link>
      <div className="ml-auto">
        {session && session.data?.user?.name ? (
          <div className="flex gap-2">
            <p>{session.data?.user?.name}</p>
         
              <button onClick ={()=>{signOut()}} >Sign Out</button>
           
          </div>
        ) : (
        
            <Link href={"sign-in"} >Sign In</Link>
       
        )}
      </div>
    </div>
  );
}

export default AppBar;