"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AtSign,
  Lock,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/utils/utils";
import { useClient } from "@/hooks/useClient";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

type ResetStep = "request" | "verify" | "success";

export function ForgotPasswordModal({
  isOpen,
  onClose,
  initialEmail = "",
}: ForgotPasswordModalProps) {
  const { addToast } = useToast();
  const client = useClient();
  const [email, setEmail] = useState(initialEmail);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStep, setCurrentStep] = useState<ResetStep>("request");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRequestCode = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      addToast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        type: "error",
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);

    try {
      await client.post("/auth/forgot-password", { email });

      addToast({
        title: "Reset Code Sent",
        description: "Please check your email for the reset code",
        type: "success",
        position: "top-center",
      });

      setCurrentStep("verify");
    } catch (error: unknown) {
      console.error("Error sending code:", error);
      const title = getErrorMessage(error);
      addToast({
        title: "Failed to send code",
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

  const handleResetPassword = async () => {
    // Validate inputs
    if (!resetCode) {
      addToast({
        title: "Missing Reset Code",
        description: "Please enter the reset code sent to your email",
        type: "error",
        position: "top-center",
      });
      return;
    }

    if (!newPassword) {
      addToast({
        title: "Missing Password",
        description: "Please enter a new password",
        type: "error",
        position: "top-center",
      });
      return;
    }

    if (newPassword.length < 8) {
      addToast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long",
        type: "error",
        position: "top-center",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      addToast({
        title: "Passwords Don't Match",
        description: "New password and confirmation must match",
        type: "error",
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);

    try {
      await client.post("/auth/reset-password", {
        email,
        code: resetCode,
        newPassword,
      });

      setCurrentStep("success");
    } catch (error: unknown) {
      console.error("Error during login:", error);
      const title = getErrorMessage(error);
      addToast({
        title: "Failed to reset password",
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

  const handleClose = () => {
    // Reset form state when closing
    setCurrentStep("request");
    setResetCode("");
    setNewPassword("");
    setConfirmPassword("");
    if (!initialEmail) setEmail("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {currentStep === "request" && "Forgot Password"}
            {currentStep === "verify" && "Reset Your Password"}
            {currentStep === "success" && "Password Reset Successful"}
          </DialogTitle>
        </DialogHeader>

        {currentStep === "request" && (
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-500 text-center">
              {`Enter your email address and we'll send you a code to reset your
              password.`}
            </p>

            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              onClick={handleRequestCode}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </Button>
          </div>
        )}

        {currentStep === "verify" && (
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-500 text-center">
              {`We've sent a code to your email. Enter it below along with your
              new password.`}
            </p>

            <div className="space-y-2">
              <Label htmlFor="verify-email">Email</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="verify-email"
                  type="email"
                  className="pl-10"
                  value={email}
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reset-code">Reset Code</Label>
              <Input
                id="reset-code"
                placeholder="Enter the code from your email"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
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

            <Button
              onClick={handleResetPassword}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </div>
        )}

        {currentStep === "success" && (
          <div className="space-y-4 py-4 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>

            <p className="text-gray-700">
              Your password has been reset successfully. You can now log in with
              your new password.
            </p>

            <Button onClick={handleClose} className="w-full">
              Return to Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
