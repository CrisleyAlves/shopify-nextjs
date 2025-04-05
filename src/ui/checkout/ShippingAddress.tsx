import { FC, JSX } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  address: string;
  postal: string;
}

const ShippingAddress: FC<{ onSubmitShippingAddress: () => void }> = ({
  onSubmitShippingAddress,
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "Guest",
      lastName: "User",
      email: "guest@guest.com",
      country: "us",
      phone: "12345",
      address: "guest address",
      postal: "12345",
    },
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    onSubmitShippingAddress();
  };

  return (
    <section className="col-span-5 md:col-span-3 mb-10 pr-5">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-md font-light text-gray-700">
              First Name
            </label>
            <input
              {...register("firstName", { required: "First Name is required" })}
              type="text"
              className="
                w-full p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
                font-light text-gray-700
              "
              placeholder="John"
            />
            {errors.firstName?.message && (
              <p className="text-red-500 font-light text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-md font-light text-gray-700">
              Last Name
            </label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
              type="text"
              className="
                w-full p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
                font-light text-gray-700
              "
              placeholder="Doe"
            />
            {errors.lastName?.message && (
              <p className="text-red-500 font-light text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-md font-light text-gray-700">
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
              w-full p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
              font-light text-gray-700
            "
            placeholder="johndoe@example.com"
          />
          {errors.email?.message && (
            <p className="text-red-500 font-light text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-md font-light text-gray-700">
            Country
          </label>
          <select
            {...register("country", { required: "Country is required" })}
            className="
              w-full p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
              font-light text-gray-700
            "
          >
            <option value="">Select Country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="lol">Other</option>
          </select>
          {errors.country?.message && (
            <p className="text-red-500 font-light text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-md font-light text-gray-700">
            Phone
          </label>
          <input
            {...register("phone", { required: "Phone is required" })}
            type="tel"
            className="
              w-full p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
              font-light text-gray-700
            "
            placeholder="+1 234 567 890"
          />
          {errors.phone?.message && (
            <p className="text-red-500 font-light text-sm mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-x-4">
          <div>
            <label className="block mb-1 text-md font-light text-gray-700">
              Full Address
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              className="
                w-full resize-none p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
                font-light text-gray-700
              "
              placeholder="123 Main St, City, Country"
            />
            {errors.address?.message && (
              <p className="text-red-500 font-light text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-md font-light text-gray-700">
              Postal Code
            </label>
            <input
              {...register("postal", { required: "Postal is required" })}
              type="text"
              className="
                w-full p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-950
                font-light text-gray-700
              "
              placeholder="12345"
            />
            {errors.postal?.message && (
              <p className="text-red-500 font-light text-sm mt-1">
                {errors.postal.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="
            w-full bg-indigo-950 font-light text-white p-2 hover:bg-white hover:text-indigo-950
            border border-indigo-950 transition
          "
        >
          Continue to Product Review
        </button>
      </form>
    </section>
  );
};

export default ShippingAddress;
