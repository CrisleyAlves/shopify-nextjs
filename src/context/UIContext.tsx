"use client";
import { createContext, useContext, useState } from "react";

type NotificationType = {
  message?: string;
  type: "info" | "success" | "warning" | "error";
  visible: boolean;
};

const NOTIFICATION_INITIAL_VALUES: NotificationType = {
  visible: false,
  message: "",
  type: "info",
};

interface UIProviderType {
  showStickyNav: boolean;
  setShowStickyNav: (value: boolean) => void;
  showSearchForm: boolean;
  setShowSearchForm: (value: boolean) => void;
  showCart: boolean;
  setShowCart: (value: boolean) => void;
  showSidenav: boolean;
  setShowSidenav: (value: boolean) => void;
  handleNotification: (value: NotificationType) => void;
  notification: NotificationType;
}

const UIContext = createContext<UIProviderType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSidenav, setShowSidenav] = useState(false);
  const [notification, setNotification] = useState<NotificationType>(
    NOTIFICATION_INITIAL_VALUES
  );

  const handleNotification = (value: NotificationType) => {
    setNotification({ ...value, visible: true });

    setTimeout(() => {
      setNotification((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 3000);
  };

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
        notification,
        handleNotification,
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
