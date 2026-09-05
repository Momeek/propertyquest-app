"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type FileInfo = { name: string; size: number; type: string; url: string };

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: {
    role: string;
    fullName: string;
    email: string;
    phone: string;
    cacNumber?: string;
    nin?: string;
    isAffiliated?: boolean;
    document?: FileInfo | null;
    affiliationDocument?: FileInfo | null;
  };
}

export default function ReviewModal({
  isOpen,
  onClose,
  onConfirm,
  data,
}: ReviewModalProps) {
  const formatRole = (role: string) => {
    return role
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Your Application</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">Role:</div>
              <div>{formatRole(data.role)}</div>
              <div className="font-medium">Full Name:</div>
              <div>{data.fullName}</div>
              <div className="font-medium">Email:</div>
              <div>{data.email}</div>
              <div className="font-medium">Phone:</div>
              <div>{data.phone}</div>
            </div>
          </div>

          {(data.cacNumber || data.nin || data.isAffiliated !== undefined) && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">
                Verification Information
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {data.cacNumber && (
                  <>
                    <div className="font-medium">CAC Number:</div>
                    <div>{data.cacNumber}</div>
                  </>
                )}
                {data.nin && (
                  <>
                    <div className="font-medium">NIN:</div>
                    <div>{data.nin}</div>
                  </>
                )}
                {data.isAffiliated !== undefined && (
                  <>
                    <div className="font-medium">Affiliated with agency:</div>
                    <div>{data.isAffiliated ? "Yes" : "No"}</div>
                  </>
                )}
                {data.document && (
                  <>
                    <div className="font-medium">Document:</div>
                    <div>{data.document.name}</div>
                  </>
                )}
                {data.affiliationDocument && (
                  <>
                    <div className="font-medium">Affiliation Document:</div>
                    <div>{data.affiliationDocument.name}</div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
            <p className="text-sm text-amber-800">
              Please review your information carefully. Once submitted, your
              application will be reviewed by our team. You will be notified
              when your account is approved.
            </p>
          </div>
        </div>
        <DialogFooter className="flex space-x-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Edit Information
          </Button>
          <Button onClick={onConfirm}>Confirm & Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
