import { getUserSessions } from "@/actions/session";
import { getDeviceDetails } from "@/lib/device";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sid");
  const currentSessionId = sessionCookie?.value;
  const userSessions = await getUserSessions();

  const reorderedSessions = [
    ...userSessions!.filter((session) => session.sid === currentSessionId),
    ...userSessions!.filter((session) => session.sid !== currentSessionId),
  ];

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-70px)]">
      <div className="flex flex-col gap-5">
        {reorderedSessions?.map((session, i) => {
          const { device, imageUrl } = getDeviceDetails(session.userAgent);

          return (
            <div key={i} className="flex shadow-lg gap-2  p-3">
              <img src={imageUrl} alt="Device" className="w-[100px]" />
              <div>
                <p className="text-lg font-bold">{device}</p>
                <p className="text-xs font-semibold">
                  {session?.created_at.toDateString()}
                </p>
                {currentSessionId === session.sid && (
                  <span className="text-sm font-semibold text-green-500">
                    Current Session
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
