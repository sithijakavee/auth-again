import axios from "axios";
import { cookies } from "next/headers";

export default async function auth() {
  const cookieStore = await cookies();
  const sidCookie = cookieStore.get("sid");
  if (sidCookie) {
    const res = await axios.post(
      "https://auth-again.vercel.app/api/auth/session",
      sidCookie
    );
    if (res.data.success) {
      return {
        session: {
          sid: sidCookie.value,
          userId: res.data.session.userId,
        },
      };
    }
  }

  return false;
}
