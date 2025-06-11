"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/lib/shopify/constants";
import { useLoader } from "@/context/LoaderContext";
import { useUI } from "@/context/UIContext";
import { createCustomerAction } from "@/services/customer-service";

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const [apiErrorMessage, setApiErrorMessage] = useState<null | string>(null);

  const { pushWithLoader, setShowLoader } = useLoader();
  const { handleNotification } = useUI();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmitForm = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      setApiErrorMessage(null);
      setShowLoader(true);
      await createCustomerAction(data);
      pushWithLoader(ROUTES.ACCOUNT_LOGIN);
      handleNotification({
        type: "success",
        visible: true,
        message: "Account Created",
      });
    } catch (error) {
      console.error("Create Account error:", error);
      setApiErrorMessage(
        "An error occurred while creating your account, please try again later."
      );
      setShowLoader(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col justify-center items-center h-full w-[70%] mx-auto"
    >
      <h1 className="text-2xl text-center mb-5 uppercase">Create Account</h1>

      <div className="w-full mb-5">
        <label className="text-sm mb-1 font-normal text-gray-700">
          First Name
        </label>
        <input
          {...register("firstName", {
            required: "First Name is required",
          })}
          type="text"
          className="
                placeholder:font-extralight placeholder:text-sm
                w-full p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
                font-extralight text-gray-700
              "
          placeholder="first name"
        />
        {errors.firstName?.message && (
          <p className="text-red-500 font-light text-sm mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div className="w-full mb-5">
        <label className="text-sm mb-1 font-normal text-gray-700">
          Last Name
        </label>
        <input
          {...register("lastName", {
            required: "Last Name is required",
          })}
          type="text"
          className="
                placeholder:font-extralight placeholder:text-sm
                w-full p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
                font-extralight text-gray-700
              "
          placeholder="Last Name"
        />
        {errors.lastName?.message && (
          <p className="text-red-500 font-light text-sm mt-1">
            {errors.lastName.message}
          </p>
        )}
      </div>

      <div className="w-full mb-5">
        <label className="text-sm mb-1 font-normal text-gray-700">Email</label>
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
          placeholder="your best email"
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
            placeholder:font-extralight placeholder:text-sm font-light text-gray-700
            w-full p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
            
          "
          placeholder="password"
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
        w-full mt-5 text-indigo-950 bg-white border border-black/10 p-2 font-normal
      disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-transparent"
      >
        Create Account
      </button>

      {apiErrorMessage && (
        <p className="text-red-500 font-semibold text-sm mt-3">
          {apiErrorMessage}
        </p>
      )}
    </form>
  );
}
