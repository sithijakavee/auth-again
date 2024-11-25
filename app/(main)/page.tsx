import { deleteSession, getUserSessions } from "@/actions/session";
import TerminateSessionButton from "@/components/TerminateSessionButton";
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
    <div className="flex items-center justify-center w-full h-[calc(100vh-70px)] bg-[#F9F9F9]">
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-bold">All sessions</h1>

        {reorderedSessions?.map((session, i) => {
          const { device, imageUrl } = getDeviceDetails(session.userAgent);

          return (
            <div key={i}>
              <div className="shadow-xl rounded-md p-3 flex justify-between w-[300px] h-[100px]">
                <div className="w-[100px]">
                  <img src={imageUrl} alt="Device" className="w-full" />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-bold">{device}</p>
                      {currentSessionId === session.sid && (
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                    <div className="">
                      <p className="text-xs text-black/60">
                        {session?.created_at.toDateString()}
                      </p>
                    </div>
                  </div>
                  <TerminateSessionButton sid={session.sid} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
