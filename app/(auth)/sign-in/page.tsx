"use client";

import SigninForm from "@/components/auth/SignInForm";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [username, setUsername] = useState("sith");
  const [password, setPassword] = useState("1");

  const submitForm = async () => {
    try {
      const res = await axios.post("/api/auth/sign-in", {
        username: username,
        password: password,
      });

      //   console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-2 justify-center items-center">
      <div className="flex gap-1 items-end mb-2">
        <h1 className="text-3xl font-bold">AuthN</h1>
        <h1 className="text-md font-bold">Sign Up</h1>
      </div>

      <SigninForm />
      <span className="text-sm">
        Don't have an account?{" "}
        <Link href="/sign-up" className="text-sky-500">
          Create one
        </Link>
      </span>
    </div>
  );
};

export default page;
