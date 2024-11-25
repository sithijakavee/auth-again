import { getUserSessions } from "@/actions/session";

export default async function Home() {
  const userSessions = await getUserSessions();

  console.log(userSessions);

  return (
    <div>
      <h1>Home Page</h1>
      <p>User Sessions:</p>
      <ul>
        {userSessions?.map((session) => (
          <li key={session.sid}>{session.userAgent}</li>
        ))}
      </ul>
    </div>
  );
}
