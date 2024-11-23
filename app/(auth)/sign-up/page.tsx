import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-2 justify-center items-center">
      <div className="flex gap-1 items-end mb-2">
        <h1 className="text-3xl font-bold">AuthN</h1>
        <h1 className="text-md font-bold">Sign Up</h1>
      </div>

      <SignupForm />
      <span className="text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-sky-500">
          Create one
        </Link>
      </span>
    </div>
  );
};

export default page;
