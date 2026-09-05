"use client";
import { Button } from "@/components/ui/button";
import {
  useToast,
  type ToastPosition,
  type ToastType,
} from "@/components/ui/toast";

export const ToastDemo = () => {
  const { addToast } = useToast();

  const positions: ToastPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "middle-left",
    "middle-center",
    "middle-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  const types: ToastType[] = ["success", "error", "warning", "info"];

  const showToast = (position: ToastPosition, type: ToastType) => {
    addToast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`,
      description: `This is a ${type} toast notification at the ${position} position.`,
      type,
      position,
      duration: 5000,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Toast Notifications Demo</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Toast Types</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <Button
              key={type}
              onClick={() => showToast("top-right", type)}
              variant={
                type === "success"
                  ? "default"
                  : type === "error"
                  ? "destructive"
                  : type === "warning"
                  ? "outline"
                  : "secondary"
              }
            >
              Show {type.charAt(0).toUpperCase() + type.slice(1)} Toast
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Toast Positions</h3>
        <div className="grid grid-cols-3 gap-4">
          {positions.map((position) => (
            <Button
              key={position}
              onClick={() => showToast(position, "info")}
              variant="outline"
            >
              {position}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
