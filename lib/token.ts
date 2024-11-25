import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { db } from "./db";

export const generateSID = (userId: string, email: string) => {
  const secret = process.env.JWT_SECRET;

  const sid = jwt.sign(
    {
      session: {
        userId: userId,
      },
    },
    secret!,
    {
      expiresIn: "7d",
    }
  );

  return sid;
};

export const verifySID = (sidCookie: { name: string; value: string }) => {
  let status: {
    success: boolean;
    valid: boolean;
    expired: boolean;
    session: { userId: string } | null;
  } = {
    success: false,
    valid: false,
    expired: false,
    session: null,
  };
  const secret = process.env.JWT_SECRET;

  jwt.verify(sidCookie.value, secret!, function (err, decode) {
    if (err) {
      if (err instanceof TokenExpiredError) {
        status = {
          success: false,
          valid: true,
          expired: true,
          session: null,
        };
      }
      status = {
        success: false,
        valid: false,
        expired: true,
        session: null,
      };
    }

    if (decode) {
      console.log(decode);
      status = {
        success: true,
        valid: true,
        expired: false,
        session: {
          // @ts-ignore: any
          userId: decode.session.userId,
        },
      };
    }

    return status;
  });

  return status;
};
