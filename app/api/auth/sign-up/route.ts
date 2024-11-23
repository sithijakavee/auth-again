import { db } from "@/libs/db";
import { SignUpFormSchema, SignUpFormSchemaType } from "@/schemas";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  // console.log(req.headers.get("user-agent"));

  // return Response.json({
  //   status: 200,
  // });

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
      const session = await db.session.create({
        data: {
          userId: newUser.id,
          userAgent: userAgent!,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });
      console.log(data);

      return new Response("Hello, Next.js!", {
        status: 200,
        headers: { "Set-Cookie": `sid=${session.id}` },
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
