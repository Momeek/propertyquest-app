"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/toast";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/utils/utils";
import { useClient } from "@/hooks/useClient";

export default function UserCheckForm() {
  const { addToast } = useToast();
  const client = useClient();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      addToast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        type: "error",
        position: "top-center",
      });
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await client.post("/auth/check-email", { email }, false);

      addToast({
        title: "Email Check Successful",
        description: "Please log in to your account to continue registration.",
        type: "success",
        position: "top-center",
      });
    } catch (error) {
      console.error("Error checking email:", error);
      const title = getErrorMessage(error);
      addToast({
        title: "Error",
        description: isValidationError(title)
          ? getValidationErrors(error)
          : `code: ${title}`,
        type: "error",
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold">Check Your Account</h3>
        <p className="text-gray-600 mt-2">
          Enter your email address to check if you already have an account with
          us.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#16a249] hover:bg-[#0d7a33]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Check Email"
          )}
        </Button>
      </form>
    </div>
  );
}
