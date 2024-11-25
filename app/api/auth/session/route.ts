import { db } from "@/lib/db";
import { verifySID } from "@/lib/token";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const sidCookie = await req.json();
  // console.log(sidCookie);

  if (!sidCookie) {
    return Response.json({ success: false });
  }

  const session = await db.session.findUnique({
    where: { sid: sidCookie.value },
  });

  if (!session) {
    return Response.json({ success: false });
  }

  const status = verifySID(sidCookie);

  if (!status.success) {
    return Response.json({ success: false });
  } else {
    return Response.json({ success: true, session: status.session });
  }
};
