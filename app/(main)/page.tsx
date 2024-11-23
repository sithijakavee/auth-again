"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [ip, setIp] = useState();
  useEffect(() => {
    const getClientLocation = async () => {
      const res = await fetch("https://ipinfo.io/json");
      const locationData = await res.json();
      setIp(locationData.ip);

      console.log(locationData);
    };

    getClientLocation();
  }, []);

  return <h1 className="text-3xl font-extrabold">{ip}</h1>;
}
