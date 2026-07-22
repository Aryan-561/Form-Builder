"use client";

import { useContext } from "react";
import { AlertContext, AlertContextType } from "~/providers/alert-provider";

export function useAlert(): AlertContextType {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
