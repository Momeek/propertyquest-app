"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "./toast";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "middle-left"
  | "middle-center"
  | "middle-right";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  id?: string;
  title?: string;
  description?: string | Error | unknown;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}

interface ToastContextValue {
  toasts: ToastOptions[];
  addToast: (options: ToastOptions) => string;
  updateToast: (id: string, options: Partial<ToastOptions>) => void;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Helper function to extract error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    // Handle Axios error or similar objects with response.data.message
    if (
      "response" in error &&
      typeof error.response === "object" &&
      error.response &&
      "data" in error.response &&
      typeof error.response.data === "object" &&
      error.response.data &&
      "message" in error.response.data
    ) {
      return String(error.response.data.message);
    }

    // Handle objects with message property
    if ("message" in error && error.message) {
      return String(error.message);
    }
  }

  return String(error);
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const addToast = useCallback((options: ToastOptions) => {
    const id = options.id || uuidv4();

    // Process description if it's an error object
    let description = options.description;
    if (description && typeof description !== "string") {
      description = getErrorMessage(description);
    }

    const toast = {
      id,
      title: options.title || "",
      description: description || "",
      type: options.type || "info",
      duration: options.duration || 5000,
      position: options.position || "top-right",
      onClose: options.onClose,
    };

    setToasts((prev) => [...prev, toast]);

    if (toast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }

    return id;
  }, []);

  const updateToast = useCallback(
    (id: string, options: Partial<ToastOptions>) => {
      setToasts((prev) =>
        prev.map((toast) => {
          if (toast.id !== id) return toast;

          // Process description if it's an error object
          let description = options.description;
          if (description && typeof description !== "string") {
            description = getErrorMessage(description);
          }

          return {
            ...toast,
            ...options,
            description:
              description !== undefined ? description : toast.description,
          };
        })
      );
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, updateToast, removeToast, removeAllToasts }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  // Group toasts by position
  const groupedToasts = toasts.reduce<Record<ToastPosition, ToastOptions[]>>(
    (acc, toast) => {
      const position = toast.position as ToastPosition;
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(toast);
      return acc;
    },
    {
      "top-left": [],
      "top-center": [],
      "top-right": [],
      "middle-left": [],
      "middle-center": [],
      "middle-right": [],
      "bottom-left": [],
      "bottom-center": [],
      "bottom-right": [],
    }
  );

  return (
    <>
      {Object.entries(groupedToasts).map(([position, positionToasts]) => {
        if (positionToasts.length === 0) return null;

        return (
          <div
            key={position}
            className={`fixed z-500 flex flex-col gap-2 max-w-md w-full p-4 ${getPositionClasses(
              position as ToastPosition
            )}`}
          >
            {positionToasts.map((toast) => (
              <Toast
                key={toast.id}
                id={toast.id!}
                title={toast.title}
                description={
                  typeof toast.description === "string" ? toast.description : ""
                }
                type={toast.type as ToastType}
                onClose={() => {
                  removeToast(toast.id!);
                  toast.onClose?.();
                }}
              />
            ))}
          </div>
        );
      })}
    </>
  );
};

function getPositionClasses(position: ToastPosition): string {
  switch (position) {
    case "top-left":
      return "top-0 left-0";
    case "top-center":
      return "top-0 left-1/2 -translate-x-1/2";
    case "top-right":
      return "top-0 right-0";
    case "middle-left":
      return "top-1/2 left-0 -translate-y-1/2";
    case "middle-center":
      return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
    case "middle-right":
      return "top-1/2 right-0 -translate-y-1/2";
    case "bottom-left":
      return "bottom-0 left-0";
    case "bottom-center":
      return "bottom-0 left-1/2 -translate-x-1/2";
    case "bottom-right":
      return "bottom-0 right-0";
    default:
      return "top-0 right-0";
  }
}
