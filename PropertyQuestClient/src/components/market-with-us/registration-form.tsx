"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/toast";
import { useClient } from "@/hooks/useClient";
import { useCurrentUserStore } from "@/store/auth.store";
import { VerificationModal } from "../auth/verification-modal";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/utils/utils";
import { AtSign, Lock, User, EyeClosed, Eye, Phone } from "lucide-react";

export default function RegistrationForm() {
  const { addToast } = useToast();
  const client = useClient();
  const { setUser, setToken } = useCurrentUserStore();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Verification state
  const [showVerification, setShowVerification] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tempUserData, setTempUserData] = useState<any>(null);

  useEffect(() => {
    const storedTempUserData = localStorage.getItem("tempUserData");
    if (storedTempUserData) {
      setTempUserData(JSON.parse(storedTempUserData));
    }
  }, []);

  useEffect(() => {
    if (tempUserData?.user.email && !tempUserData?.user.isVerified) {
      setShowVerification(true);
    }
  }, [tempUserData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (phone.length < 11 || phone.length > 11) {
      addToast({
        title: "Length Error",
        description: "Phone number must be 11 characters long",
        type: "error",
        position: "top-center",
      });
      return;
    }

    if (password.length < 8) {
      addToast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long",
        type: "error",
        position: "top-center",
      });
      return;
    }

    if (password !== confirmPassword) {
      addToast({
        title: "Passwords Don't Match",
        description: "Password and confirmation must match",
        type: "error",
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await client.post("/create-user", {
        name,
        surname,
        email,
        password,
        role: "user",
        phone,
      });

      // Store the temporary user data but don't set it in the store yet
      setTempUserData(result.data.data);
      localStorage.setItem("tempUserData", JSON.stringify(result.data.data));

      // Show verification modal
      setShowVerification(true);
    } catch (error: unknown) {
      console.error("Error during signup:", error);
      const title = getErrorMessage(error);
      addToast({
        title: "Failed to create user",
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

  const handleVerifyCode = async (code: string): Promise<boolean> => {
    try {
      // Call verification API
      const result = await client.post("/auth/verify-email", {
        userId: tempUserData?.user.userId,
        code,
      });

      // If verification successful, set user and token
      if (result.status === 200) {
        setToken(result.data.data.token);
        setUser(result.data.data.user);

        await fetch("/api/set-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: result.data.data.token }),
        });

        await fetch("/api/set-user-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: result.data.data.user.role }),
        });

        localStorage.removeItem("tempUserData");

        // Full redirect triggers server request and middleware check

        window.location.reload();

        return true;
      }
      return false;
    } catch (error) {
      console.error("Verification error:", error);
      throw error;
    }
  };

  const handleResendCode = async (): Promise<boolean> => {
    try {
      const result = await client.post("/auth/resend-verification-code", {
        email: email || tempUserData?.user.email,
      });
      return result.data.data;
    } catch (error) {
      console.error("Error resending code:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold">Create Your Account</h3>
          <p className="text-gray-600 mt-2">
            Complete 1/2 of your registration to start marketing properties.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  placeholder="John"
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="surname">Surname</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="surname"
                  placeholder="Doe"
                  className="pl-10"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="text"
                  placeholder="07085748328"
                  className="pl-10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeClosed className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        email={email || (tempUserData?.user.email as string)}
        onVerify={handleVerifyCode}
        onResendCode={handleResendCode}
      />
    </>
  );
}
