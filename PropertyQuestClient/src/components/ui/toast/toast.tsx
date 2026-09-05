"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToastType } from "./toast-context";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: ToastType;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  type = "info",
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const enterTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => {
      clearTimeout(enterTimeout);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for exit animation to complete
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={cn(
        "relative z-500 flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out",
        {
          "bg-green-50 border-green-200": type === "success",
          "bg-red-50 border-red-200": type === "error",
          "bg-yellow-50 border-yellow-200": type === "warning",
          "bg-blue-50 border-blue-200": type === "info",
        },
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
      role="alert"
    >
      <div className="flex-shrink-0 z-50">
        {type === "success" && (
          <CheckCircle className="h-5 w-5 text-green-500" />
        )}
        {type === "error" && <XCircle className="h-5 w-5 text-red-500" />}
        {type === "warning" && (
          <AlertCircle className="h-5 w-5 text-yellow-500" />
        )}
        {type === "info" && <Info className="h-5 w-5 text-blue-500" />}
      </div>
      <div className="flex-1 pt-0.5 z-500">
        {title && (
          <h3
            className={cn("text-sm font-medium", {
              "text-green-800": type === "success",
              "text-red-800": type === "error",
              "text-yellow-800": type === "warning",
              "text-blue-800": type === "info",
            })}
          >
            {title}
          </h3>
        )}
        {description && (
          <div
            className={cn("mt-1 text-sm", {
              "text-green-700": type === "success",
              "text-red-700": type === "error",
              "text-yellow-700": type === "warning",
              "text-blue-700": type === "info",
            })}
          >
            {description}
          </div>
        )}
      </div>
      <button
        type="button"
        className={cn(
          "absolute top-1 right-1 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
          {
            "text-green-500 hover:bg-green-100 focus:ring-green-600":
              type === "success",
            "text-red-500 hover:bg-red-100 focus:ring-red-600":
              type === "error",
            "text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600":
              type === "warning",
            "text-blue-500 hover:bg-blue-100 focus:ring-blue-600":
              type === "info",
          }
        )}
        onClick={handleClose}
      >
        <span className="sr-only">Close</span>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
