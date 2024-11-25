"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/sign-out");
      setLoading(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Button className="bg-background p-3 " onClick={logout} disabled={loading}>
      Sign Out
      {loading && (
        <div className="inline-flex items-center justify-center ml-2">
          <MoonLoader color={"#000"} loading={loading} size={15} />
        </div>
      )}
    </Button>
  );
};

export default LogoutButton;
