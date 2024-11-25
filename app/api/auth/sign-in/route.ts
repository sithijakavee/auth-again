import { db } from "@/lib/db";
import {
  SignInFormSchema,
  SignUpFormSchema,
  SignUpFormSchemaType,
} from "@/schemas";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { generateSID } from "@/lib/token";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const validatedFields = SignInFormSchema.safeParse(body);

    if (!validatedFields.success) throw new Error("Invalid fields");

    const user = await db.user.findUnique({
      where: {
        email: validatedFields.data.email,
      },
    });

    if (!user) throw new Error("Invalid credetials");

    const isPasswordCorrect = await bcrypt.compare(
      validatedFields.data.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Invalid credentials");

    const userAgent = req.headers.get("User-Agent");
    const sid = generateSID(user.id, user.email);
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await db.session.create({
      data: {
        userId: user.id,
        sid: sid,
        userAgent: userAgent!,
        expires: expires,
      },
    });

    return new Response("ok", {
      status: 200,
      headers: {
        "Set-Cookie": `sid=${session.sid}; Expires=${new Date(
          session.expires
        ).toUTCString()}; HttpOnly; Path=/`,
      },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return Response.json(
        { message: error.message },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        { message: "Something went Wrong" },
        {
          status: 400,
        }
      );
    }
  }
};
