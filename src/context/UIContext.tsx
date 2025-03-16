"use client";
import { createContext, useContext, useState } from "react";

interface UIProviderType {
  showStickyNav: boolean;
  setShowStickyNav: (value: boolean) => void;
  showSearchForm: boolean;
  setShowSearchForm: (value: boolean) => void;
  showCart: boolean;
  setShowCart: (value: boolean) => void;
  showSidenav: boolean;
  setShowSidenav: (value: boolean) => void;
  showLoader: boolean;
  setShowLoader: (value: boolean) => void;
}

const UIContext = createContext<UIProviderType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSidenav, setShowSidenav] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  return (
    <UIContext.Provider
      value={{
        showStickyNav,
        setShowStickyNav,
        showSearchForm,
        setShowSearchForm,
        showCart,
        setShowCart,
        showSidenav,
        setShowSidenav,
        showLoader,
        setShowLoader,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
