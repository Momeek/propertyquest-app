"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-[#16a249]" />
          </div>
          <DialogTitle className="text-center text-2xl">
            {"Welcome Back! Registration Successful!"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {
              "You have successfully signed in to your account. Your account has been created successfully."
            }
          </DialogDescription>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="mb-4">
            {
              "You can now access your dashboard and start marketing your properties.You can now start marketing your properties with PropertyQuest."
            }
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button asChild className="flex-1">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/dashboard/add-property">List a Property</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
