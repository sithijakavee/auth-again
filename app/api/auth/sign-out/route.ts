import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const sidCookie = cookieStore.get("sid");

  if (sidCookie) {
    console.log(sidCookie.value);

    const session = await db.session.findUnique({
      where: {
        sid: sidCookie.value,
      },
    });

    if (session) {
      await db.session.delete({
        where: {
          sid: sidCookie.value,
        },
      });
    }
  }

  const res = NextResponse.json({
    message: "Logout succefully",
    success: true,
  });

  res.cookies.set("sid", "", { httpOnly: true, expires: new Date(0) });

  return res;
};
