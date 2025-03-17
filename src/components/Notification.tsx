"use client";

import { useUI } from "@/context/UIContext";

export default function Notification() {
  const { notification } = useUI();

  const bgColor = {
    info: "bg-blue-300 text-blue-900 border-blue-600",
    success: "bg-green-300 text-green-900 border-green-600",
    warning: "bg-yellow-300 text-yellow-900 border-yellow-600",
    error: "bg-red-300 text-red-900 border-red-600",
  }[notification.type];

  if (!notification.visible) return "";

  return (
    <div className="fixed flex items-center w-full z-40 justify-center mt-20">
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
