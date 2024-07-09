"use client"

import {  getSession,  signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

  function AppBar() {

  const session = useSession()
  return (
    <div className="p-2 bg-white  flex gap-2  ">
      
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