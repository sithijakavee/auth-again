"use client";

import { getUserSessions } from "@/actions/session";
import { getDeviceDetails } from "@/lib/device";
import { useEffect, useState } from "react";

const Sessions = () => {
  const [userSessions, setUserSessions] = useState<any>();
  useEffect(() => {
    const getSessions = async () => {
      const userSessions = await getUserSessions();
      setUserSessions(userSessions);
    };

    getSessions();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      {userSessions?.map((session: any, i: number) => {
        const { device, imageUrl } = getDeviceDetails(session.userAgent);

        return (
          <div key={i} className="flex shadow-lg gap-2  p-3">
            <img src={imageUrl} alt="Device" className="w-[100px]" />
            <div>
              <p className="text-lg font-bold">{device}</p>
              <p className="text-xs font-semibold">
                {session?.created_at.toDateString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sessions;
