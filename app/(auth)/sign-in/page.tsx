"use client";

import axios, { AxiosError } from "axios";
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
    <div className="w-full h-screen flex items-center justify-center">
      <form className="flex flex-col items-center gap-2">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="border px-2 py-1"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border px-2 py-1"
        />
        <button
          type="button"
          className="bg-emerald-500 p-2 text-white font-bold w-full"
          onClick={submitForm}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default page;
