import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <nav className="w-full h-[70px] bg-black flex items-center">
      <div className="flex items-center justify-between px-4 py-2 w-full">
        <Link href="/">
          <h1 className="text-white font-bold">AuthN</h1>
        </Link>
        <ul className="flex gap-4">
          <LogoutButton />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
