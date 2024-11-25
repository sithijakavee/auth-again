"use server";

import auth from "@/lib/auth";
import { db } from "@/lib/db";

export const getUserSessions = async () => {
  const session = await auth();
  if (session) {
    const sessions = await db.session.findMany({
      where: { userId: session.session.userId },
    });

    return sessions;
  }
};
