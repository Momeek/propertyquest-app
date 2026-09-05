"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AtSign, Lock, User, EyeClosed, Eye, Phone } from "lucide-react";
import { base2Url } from "@/utils/baseUrl";
import { useClient } from "@/hooks/useClient";
import { useCurrentUserStore } from "@/store/auth.store";
import { useToast } from "@/components/ui/toast";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/utils/utils";
import { VerificationModal } from "./verification-modal";

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

export default function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
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
      const result = await client.post("/api/create-user", {
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
        if (result.data.data.user.role !== "user") {
          window.location.href = "/dashboard";
        } else {
          window.location.reload();
        }

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

  const handleSocialSignUp = (provider: "google" | "facebook" | "apple") => {
    window.open(`${base2Url}/auth/${provider}/callback`, "_self");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
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

        {/* <div className="space-y-3">
          <Label>Select Your Role</Label>
          <RadioGroup
            value={role || ""}
            onValueChange={(value) => setRole(value as PropertyQuestRole)}
          >
            {[
              "developer",
              "property_manager",
              "landlord",
              "agent",
              "broker",
            ].map((roleOption) => (
              <div key={roleOption} className="flex items-center space-x-2">
                <RadioGroupItem value={roleOption} id={`role-${roleOption}`} />
                <Label
                  htmlFor={`role-${roleOption}`}
                  className="cursor-pointer"
                >
                  {roleOption.toUpperCase()}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div> */}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-500">Already have an account?</span>{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-[#16a249]"
            onClick={onSwitchToSignIn}
          >
            Sign in
          </Button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-800">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={() => handleSocialSignUp("google")}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button disabled variant="outline" type="button">
            <svg
              className="mr-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            Facebook
          </Button>
          <Button disabled variant="outline" type="button">
            <svg
              className="mr-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
            </svg>
            Apple
          </Button>
        </div>
      </form>

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
