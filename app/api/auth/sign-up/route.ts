import { db } from "@/lib/db";
import { SignUpFormSchema, SignUpFormSchemaType } from "@/schemas";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { generateSID } from "@/lib/token";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const data = {
      email: body.email,
      password: hashedPassword,
      country: body.locationData.country,
    };

    const existingEmail = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingEmail) throw new Error("Email already exists");

    const newUser = await db.user.create({ data: data });

    if (newUser) {
      const userAgent = req.headers.get("User-Agent");
      const sid = generateSID(newUser.id, newUser.email);
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      const session = await db.session.create({
        data: {
          userId: newUser.id,
          sid: sid,
          userAgent: userAgent!,
          expires: expires,
        },
      });
      console.log(data);

      return new Response("ok", {
        status: 200,
        headers: {
          "Set-Cookie": `sid=${session.sid}; Expires=${new Date(
            session.expires
          ).toUTCString()}; HttpOnly; Path=/`,
        },
      });
    }
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
