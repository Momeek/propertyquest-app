"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";

interface LoginFormProps {
  email: string;
  onSuccess: () => void;
}

export default function LoginForm({ email, onSuccess }: LoginFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Simulate API call to login
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll always succeed
      // In a real app, you would validate credentials
      onSuccess();
    } catch (err) {
      console.log(err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold">Welcome Back!</h3>
        <p className="text-gray-600 mt-2">
          Please enter your password to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            disabled
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </div>
  );
}
