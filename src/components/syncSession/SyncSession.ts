import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { setUser } from "@/redux/slices/authSlice"; // Ensure the path is correct
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

export default SyncSession;
