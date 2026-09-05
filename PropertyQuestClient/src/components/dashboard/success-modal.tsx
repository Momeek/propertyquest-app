"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Application Submitted
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">
              Thank you for your application!
            </h3>
            <p className="text-sm text-gray-500">
              Your application has been submitted successfully and is now under
              review. We will notify you via email once your account is
              approved.
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-md border border-blue-200 w-full">
            <p className="text-sm text-blue-800">
              The review process typically takes 1-2 business days. Once
              approved, you will be able to list your properties on our
              platform.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Return to Home
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
