"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import type { APIErrorType } from "@/lib/shopify/types/errors";

import { ROUTES } from "@/lib/shopify/constants";
import { useLoader } from "@/context/LoaderContext";
import { createCustomerAccessTokenAction } from "@/services/customer-service";

interface FormFields {
  email: string;
  password: string;
}

export default function Login() {
  const [apiErrorMessage, setApiErrorMessage] = useState<null | string>(null);

  const { pushWithLoader, setShowLoader } = useLoader();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmitForm = async (data: { email: string; password: string }) => {
    try {
      setApiErrorMessage(null);
      setShowLoader(true);
      await createCustomerAccessTokenAction(data);
      pushWithLoader(ROUTES.ACCOUNT_OVERVIEW);
    } catch (error) {
      const apiError = error as APIErrorType;
      setApiErrorMessage(apiError?.message);
      setShowLoader(false);
    }
  };

  return (
    <section
      className="
        w-full flex-1 -gray-50 pt-16 pb-16
        md:w-[50%] md:min-h-[500px] md:pt-0 md:pb-0"
    >
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col justify-center items-center h-full w-[70%] mx-auto"
      >
        <h1 className="text-2xl text-center mb-5 uppercase">Login</h1>
        <div className="w-full mb-5">
          <label className="text-sm mb-1 font-normal text-gray-700">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            className="
                placeholder:font-extralight placeholder:text-sm
                w-full p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
                font-extralight text-gray-700
              "
            placeholder="email address"
          />
          {errors.email?.message && (
            <p className="text-red-500 font-light text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block text-sm mb-1 font-normal text-gray-700">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="
                placeholder:font-extralight placeholder:text-sm
                w-full p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
                font-light text-gray-700
              "
            placeholder="your best password"
          />
          {errors.password?.message && (
            <p className="text-red-500 font-light text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          aria-label="Login"
          className="
          w-full mt-5 text-indigo-950 bg-white border border-black/10 p-2 uppercase font-normal
          disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-transparent"
        >
          Login
        </button>
        {apiErrorMessage && (
          <p className="text-red-500 font-semibold text-sm mt-3">
            {apiErrorMessage}
          </p>
        )}
      </form>
    </section>
  );
}
