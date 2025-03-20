"use client";

import { useUI } from "@/context/UIContext";

export default function Loader() {
  const { showLoader } = useUI();

  return (
    <div>
      {showLoader && (
        <div className="w-full h-full fixed left-0 top-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
