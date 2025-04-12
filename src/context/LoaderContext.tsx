"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface LoaderProviderType {
  showLoader: boolean;
  setShowLoader: (value: boolean) => void;
  pushWithLoader: (url: string) => void;
}

const LoaderContext = createContext<LoaderProviderType | undefined>(undefined);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(false);

  const router = useRouter();
  const pathanme = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  }, [pathanme, searchParams]);

  const pushWithLoader = (url: string) => {
    setShowLoader(true);
    router.push(url);
  };

  return (
    <LoaderContext.Provider
      value={{
        showLoader,
        setShowLoader,
        pushWithLoader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
