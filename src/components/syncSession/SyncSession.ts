"use client"
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { fetchUserData, setUser } from "@/redux/slices/authSlice"; // Ensure the path is correct
import { useAppDispatch } from "@/hooks/useStore";

const SyncSession = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const syncSession = async () => {
      const session = await getSession();
      if (session?.user) {
        dispatch(setUser(session.user));
      }
    };

    syncSession();
  }, [dispatch]);

  return null;
};

// const SyncSession = () => {
//   const dispatch = useAppDispatch()

//   useEffect(() => {
//     const syncSession = async () => {
//       const session = await getSession();
//       console.log("sync session ",session)
//    if(session?.user?.email){
    
//     const userData = await dispatch(fetchUserData(session?.user?.email)).unwrap();
   
    
//     dispatch(setUser(userData));
  
//    }
//     };

//     syncSession();
//   }, [dispatch]);

//   return null;
// };






export default SyncSession;
