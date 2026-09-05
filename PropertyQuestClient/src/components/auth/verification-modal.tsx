"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { AlertCircle } from "lucide-react";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/utils/utils";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerify: (code: string) => Promise<boolean>;
  onResendCode: () => Promise<boolean>;
}

export function VerificationModal({
  isOpen,
  onClose,
  email,
  onVerify,
  onResendCode,
}: VerificationModalProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { addToast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      addToast({
        title: "Verification code required",
        description: "Please enter the verification code sent to your email",
        type: "error",
        position: "top-center",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const success = await onVerify(verificationCode);
      if (success) {
        addToast({
          title: "Verification successful",
          description: "Your email has been verified successfully",
          type: "success",
          position: "bottom-center",
        });
        onClose();
      }
    } catch (error) {
      const title = getErrorMessage(error);
      addToast({
        title: "Verification failed",
        description: isValidationError(title)
          ? getValidationErrors(error)
          : `code: ${title}`,
        type: "error",
        position: "top-center",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      const success = await onResendCode();
      if (success) {
        setCountdown(60); // Start 60 second countdown
        addToast({
          title: "Code resent",
          description: `A new verification code has been sent to ${email}`,
          type: "success",
          position: "bottom-center",
        });
      }
    } catch (error) {
      const title = getErrorMessage(error);
      addToast({
        title: "Failed to resend code",
        description: isValidationError(title)
          ? getValidationErrors(error)
          : `code: ${title}`,
        type: "error",
        position: "top-center",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your email</DialogTitle>
          <DialogDescription>
            {`We've sent a verification code to `}
            <span className="font-medium">{email}</span>. Please enter it below
            to verify your account.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={handleResendCode}
              disabled={isResending || countdown > 0}
              className="sm:order-2"
            >
              {countdown > 0
                ? `Resend code in ${countdown}s`
                : isResending
                ? "Resending..."
                : "Resend code"}
            </Button>
            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="sm:order-1"
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg flex gap-3 items-start">
          <div className="text-amber-500 mt-0.5">
            <AlertCircle size={18} />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              {`If you don't see the email in your inbox, please check your spam
              folder or contact support if you need assistance.`}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
