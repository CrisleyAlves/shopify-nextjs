"use client";

import { useUI } from "@/context/UIContext";

export default function Notification() {
  const { notification } = useUI();

  const bgColor = {
    info: "bg-blue-100 text-blue-800 border-blue-300",
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
  }[notification.type];

  if (!notification.visible) return "";

  return (
    <div
      className="
      fixed flex items-center w-full z-40 justify-center mt-3
      md:justify-end md:pr-2"
    >
      <div
        className={`py-2 px-10 border-l-4 rounded-md ${bgColor} shadow-md max-w-sm font-light
        transition-all duration-500 transform ${
          notification.visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 mt-[-50px]"
        }`}
      >
        {notification.message}
      </div>
    </div>
  );
}
