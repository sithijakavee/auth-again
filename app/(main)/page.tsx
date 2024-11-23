"use client";

import { useEffect, useState } from "react";

type TypeLocation = {
  city: string;
  country: string;
  ip: string;
  loc: string;
  org: string;
  postal: string;
  readme: string;
  region: string;
  timezone: string;
};

export default function Home() {
  const [ip, setIp] = useState<TypeLocation>();
  useEffect(() => {
    const getClientLocation = async () => {
      const res = await fetch("https://ipinfo.io/json");
      const locationData = await res.json();
      setIp(locationData);

      console.log(locationData);
    };

    getClientLocation();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-extrabold">{ip?.ip}</h1>
      <span className="text-xl font-semibold">{ip?.city}</span>
      <br />
      <span className="text-xl font-semibold">{ip?.country} </span>
    </>
  );
}
