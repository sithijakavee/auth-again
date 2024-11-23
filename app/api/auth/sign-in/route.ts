import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  //   const ip = await axios.get("https://api.ipify.org?format=json");
  const ip = await axios.get("https://ipinfo.io/json");

  console.log(ip.data);

  if (data.username !== "sith" || data.password !== "1")
    return Response.json(
      { message: "Invalid username or password" },
      {
        status: 403,
      }
    );

  const accessToken = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: {
        username: data.username,
        role: "admin",
        pass: data.password,
      },
    },
    "secret"
  );

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { "Set-Cookie": `access_token=${accessToken}` },
  });
};
