"use client";

import { deleteSession, getUserSessions } from "@/actions/session";
import { getDeviceDetails } from "@/lib/device";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

const TerminateSessionButton = ({ sid }: { sid: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const terminateSession = async (sid: string) => {
    setLoading(true);
    try {
      const res = await deleteSession(sid);
      if (res) router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="min-w-[100px] font-semibold p-1 px-2 bg-[#FF0000] text-white text-sm rounded-full"
      onClick={() => terminateSession(sid)}
      disabled={loading}
    >
      Terminate
      {loading && <MoonLoader color={"#000"} loading={loading} size={15} />}
    </button>
  );
};

export default TerminateSessionButton;
