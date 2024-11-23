"use client";

import { getClientLocation } from "@/libs/loc";
import { SignUpFormSchema, SignUpFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import {
  CheckCircle,
  CircleX,
  EyeClosed,
  EyeIcon,
  TicketCheckIcon,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { MoonLoader } from "react-spinners";

const SignupForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit = async (values: SignUpFormSchemaType) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const locationData = await getClientLocation();

      if (!locationData) throw new Error("Something went wrong!!");

      axios
        .post("/api/auth/sign-up", {
          email: values.email,
          password: values.password,
          locationData: locationData,
        })
        .then((res) => {
          setLoading(false);
          setSuccess("Successfully signed up");
          if (res) setSuccess("User successfully signed up");
        })
        .catch((err) => {
          setLoading(false);

          if (err instanceof AxiosError) {
            setError(err.response?.data.message);
          } else {
            setError("Something went wrong");
            console.error(err);
          }
        });
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
        console.log(error);
      } else if (error instanceof Error) {
        console.log(error);

        setError(error.message);
      } else {
        setError("Something went wrong");
        console.error(error);
      }
    }
  };

  return (
    <form
      className="w-[300px] md:w-[400px] max-w-[400px]  mx-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col items-center gap-3">
        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="Email"
            className="w-full py-3 focus:outline-none px-4 rounded-full text-xs bg-foreground border"
            {...register("email")}
          />
          {errors.email?.message && (
            <span className="text-sm ml-3 text-red-500">
              {errors.email.message.toString()}
            </span>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full py-3 px-4 rounded-full text-sm bg-foreground flex items-center border justify-between">
            <input
              type={showPassword.showPassword ? "text" : "password"}
              placeholder="Password"
              className="focus:outline-none bg-transparent w-full"
              {...register("password")}
            />
            {showPassword.showPassword ? (
              <EyeIcon
                className="size-[18px] cursor-pointer text-black/40"
                onClick={() =>
                  setShowPassword((prevState) => ({
                    ...prevState,
                    showPassword: false,
                  }))
                }
              />
            ) : (
              <EyeClosed
                className="size-[18px] cursor-pointer text-black/40"
                onClick={() =>
                  setShowPassword((prevState) => ({
                    ...prevState,
                    showPassword: true,
                  }))
                }
              />
            )}
          </div>
          {errors.password?.message && (
            <span className="text-xs ml-3 text-red-500">
              {errors.password.message.toString()}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="w-full py-3 px-4 rounded-full text-sm border bg-foreground flex items-center justify-between">
            <input
              type={showPassword.showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="focus:outline-none bg-transparent w-full"
              {...register("confirmPassword")}
            />
            {showPassword.showConfirmPassword ? (
              <EyeIcon
                className="size-[18px] cursor-pointer text-black/40"
                onClick={() =>
                  setShowPassword((prevState) => ({
                    ...prevState,
                    showConfirmPassword: false,
                  }))
                }
              />
            ) : (
              <EyeClosed
                className="size-[18px] cursor-pointer text-black/40"
                onClick={() =>
                  setShowPassword((prevState) => ({
                    ...prevState,
                    showConfirmPassword: true,
                  }))
                }
              />
            )}
          </div>
          {errors.confirmPassword?.message && (
            <span className="text-xs ml-3 text-red-500">
              {errors.confirmPassword.message.toString()}
            </span>
          )}
        </div>

        {error ? (
          <div className="text-sm bg-red-500/20 p-3 w-full rounded-full text-red-500 flex items-center gap-2">
            <CircleX size={20} />
            {error}
          </div>
        ) : success ? (
          <div className="text-sm bg-emerald-500/20 p-3 w-full rounded-full text-emerald-500 flex items-center gap-2">
            <CheckCircle size={20} />
            {success}
          </div>
        ) : null}

        <Button
          type="submit"
          className="w-full rounded-full font-semibold bg-background"
          disabled={loading}
        >
          Sign Up
          <MoonLoader color={"#000"} loading={loading} size={15} />
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
