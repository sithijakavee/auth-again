import SigninForm from "@/components/auth/SignInForm";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-2 justify-center items-center">
      <div className="flex gap-1 items-end mb-2">
        <h1 className="text-3xl font-bold">AuthN</h1>
        <h1 className="text-md font-bold">Sign In</h1>
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
