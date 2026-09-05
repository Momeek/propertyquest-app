"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import ReviewModal from "./review-modal";
import SuccessModal from "./success-modal";
import { useCurrentUserStore } from "@/store/auth.store";
import { useClient } from "@/hooks/useClient";
import { useToast } from "@/components/ui/toast";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
} from "@/utils/utils";

export type Role =
  | "agent/broker"
  | "property_manager"
  | "agency"
  | "developer"
  | "landlord"
  | "";
export type FileInfo = {
  name: string;
  size: number;
  type: string;
  url: string;
};

export default function PropertyListingForm({
  isUpdate,
}: {
  isUpdate?: boolean;
}) {
  const { user, setUser } = useCurrentUserStore();
  const { addToast } = useToast();
  const client = useClient();
  const [role, setRole] = useState<Role>("");
  const [cacNumber, setCacNumber] = useState("");
  const [nin, setNin] = useState("");
  const [isAffiliated, setIsAffiliated] = useState(false);
  const [documentReview, setDocumentReview] = useState<FileInfo | null>(null);
  const [document, setDocument] = useState<File | null>(null);
  const [affiliationDocumentReview, setAffiliationDocumentReview] =
    useState<FileInfo | null>(null);
  const [affiliationDocument, setAffiliationDocument] = useState<File | null>(
    null
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phone, setPhone] = useState(user.phone ?? "");
  const hasPhone = !!user.phone;

  const handleFileChange = (file: File | null) => {
    if (file) {
      const fileInfo: FileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      };
      setDocumentReview(fileInfo);
      setDocument(file);
    } else {
      setDocumentReview(null);
      setDocument(null);
    }
  };

  const handleFAffiliationFileChange = (file: File | null) => {
    if (file) {
      const fileInfo: FileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      };
      setAffiliationDocumentReview(fileInfo);
      setAffiliationDocument(file);
    } else {
      setAffiliationDocumentReview(null);
      setAffiliationDocument(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form ushcj
    if (!role) {
      addToast({
        title: "Please select a role",
        description: "",
        type: "error",
        position: "top-center",
      });
      return;
    }

    // Validate role-specific fields
    if (
      (role === "agency" ||
        role === "agent/broker" ||
        role === "property_manager" ||
        role === "developer") &&
      !cacNumber
    ) {
      addToast({
        title: "Please enter your CAC number",
        description: "",
        type: "error",
        position: "top-center",
      });
      return;
    }

    if (
      (role === "agency" ||
        role === "agent/broker" ||
        role === "property_manager" ||
        role === "developer") &&
      (!documentReview || !document)
    ) {
      addToast({
        title: "Please upload verification document (CAC certificate)",
        description: "",
        type: "error",
        position: "top-center",
      });
      return;
    }

    if (
      (role === "developer" ||
        role === "agent/broker" ||
        role === "landlord" ||
        role === "property_manager") &&
      !nin
    ) {
      addToast({
        title: "Please enter your NIN",
        description: "",
        type: "error",
        position: "top-center",
      });
      return;
    }

    if (
      role === "agent/broker" &&
      isAffiliated &&
      (!affiliationDocumentReview || !affiliationDocument)
    ) {
      addToast({
        title:
          "Since you're affiliated, please also upload the affiliation document.",
        description: "",
        type: "error",
        position: "top-center",
      });
      return;
    }

    // Show review modal
    setShowReviewModal(true);
  };

  const handleConfirmSubmission = async () => {
    setShowReviewModal(false);
    setIsSubmitting(true);

    let result;

    try {
      const formData = new FormData();
      formData.append("role", role);
      formData.append("cacNumber", cacNumber);
      formData.append("nin", nin);
      formData.append("isAffiliated", String(isAffiliated));
      if (document) {
        formData.append("businessDocument", document);
      }
      if (affiliationDocument) {
        formData.append("affiliationDocument", affiliationDocument);
      }
      if (!hasPhone) {
        formData.append("phone", phone);
      }

      if (isUpdate) {
        result = await client.multiPartPost(
          `/update-document/${user.userId}`,
          formData
        );
      } else {
        result = await client.multiPartPost(
          `/update-user/${user.userId}`,
          formData
        );
      }

      addToast({
        title: `Application ${isUpdate ? "updated" : "submitted"}`,
        description: `Your application has been successfully ${
          isUpdate ? "Updated" : "submitted"
        }`,
        type: "success",
        position: "bottom-center",
      });

      setUser(result.data.data.user);

      await fetch("/api/set-user-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: result.data.data.user.role }),
      });

      // Show success modal
      setIsSubmitting(false);
      setShowSuccessModal(true);

      setRole("");
      setCacNumber("");
      setNin("");
      setIsAffiliated(false);
      setDocumentReview(null);
      setAffiliationDocumentReview(null);

      window.location.reload();
    } catch (error: unknown) {
      console.error("Error submitting application:", error);
      const title = getErrorMessage(error);
      addToast({
        title: "Failed to update account",
        description: isValidationError(title)
          ? getValidationErrors(error)
          : `code: ${title}`,
        type: "error",
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine which fields to show based on role
  const needsCAC =
    role === "agency" ||
    role === "agent/broker" ||
    role === "property_manager" ||
    role === "developer" ||
    role === "landlord";
  const needsAffiliation = role === "agent/broker";

  function isFieldRequired(fieldName: string): boolean {
    if (fieldName === "nin") {
      return (
        role === "developer" ||
        role === "agent/broker" ||
        role === "landlord" ||
        role === "property_manager"
      );
    }
    if (fieldName === "cacNumber") {
      return (
        role === "agency" ||
        role === "agent/broker" ||
        role === "property_manager" ||
        role === "developer"
      );
    }
    if (fieldName === "isAffiliated") {
      return role === "agent/broker";
    }
    if (fieldName === "document") {
      return (
        role === "agency" ||
        role === "agent/broker" ||
        role === "property_manager" ||
        role === "developer"
      );
    }
    return false;
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={user.name}
                    className="mt-1"
                    required
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    value={user.surname}
                    className="mt-1"
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    className="mt-1"
                    required
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="phone">
                    Phone Number{" "}
                    {!hasPhone && <span className="text-red-700">*</span>}{" "}
                  </Label>
                  {hasPhone ? (
                    <Input
                      id="phone"
                      type="tel"
                      value={user.phone}
                      className="mt-1"
                      required
                      disabled
                    />
                  ) : (
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1"
                      required
                    />
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="role">Your Business Role</Label>
                <Select
                  value={role}
                  onValueChange={(value) => setRole(value as Role)}
                >
                  <SelectTrigger id="role" className="w-full mt-1">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-[#dddd]">
                    <SelectItem
                      className="hover:text-[#16a249]"
                      value="agent/broker"
                    >
                      Real Estate Agent/Broker
                    </SelectItem>
                    <SelectItem
                      className="hover:text-[#16a249]"
                      value="property_manager"
                    >
                      Property Manager
                    </SelectItem>
                    <SelectItem className="hover:text-[#16a249]" value="agency">
                      Real Estate Agency
                    </SelectItem>
                    <SelectItem
                      className="hover:text-[#16a249]"
                      value="developer"
                    >
                      Developer
                    </SelectItem>
                    <SelectItem
                      className="hover:text-[#16a249]"
                      value="landlord"
                    >
                      Landlord
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dynamic fields based on role */}
              {role && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 mt-6">
                  <h3 className="font-medium text-lg mb-4">
                    Role-specific Information
                  </h3>

                  {/* Fields for Real Estate Agent or Broker */}
                  {needsCAC && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cacNumber">
                          CAC Number{" "}
                          {isFieldRequired("cacNumber") && (
                            <span className="text-red-700">*</span>
                          )}
                        </Label>
                        <Input
                          id="cacNumber"
                          value={cacNumber}
                          onChange={(e) => setCacNumber(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>
                          Upload Verification Document{" "}
                          {isFieldRequired("document") && (
                            <span className="text-red-700">*</span>
                          )}
                        </Label>
                        <p className="text-sm text-gray-500 mb-2">
                          Please upload your CAC certificate document (PDF, JPG,
                          PNG)
                        </p>
                        <FileUpload
                          onFileChange={handleFileChange}
                          acceptedFileTypes={[
                            "application/pdf",
                            "image/jpeg",
                            "image/png",
                          ]}
                          maxSizeMB={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="nin">
                          National Identification Number (NIN){" "}
                          {isFieldRequired("nin") && (
                            <span className="text-red-700">*</span>
                          )}
                        </Label>
                        <Input
                          id="nin"
                          value={nin}
                          onChange={(e) => setNin(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  {/* Fields for Developer or Real Estate Agent */}
                  {needsAffiliation && (
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="isAffiliated">
                          Are you affiliated with any real estate agency?
                        </Label>
                        <div className="flex items-center space-x-4">
                          <Button
                            type="button"
                            variant={isAffiliated ? "default" : "outline"}
                            onClick={() => setIsAffiliated(true)}
                          >
                            Yes
                          </Button>
                          <Button
                            type="button"
                            variant={!isAffiliated ? "default" : "outline"}
                            onClick={() => setIsAffiliated(false)}
                          >
                            No
                          </Button>
                        </div>
                      </div>

                      {isAffiliated && (
                        <div className="ml-6 mt-4">
                          <Label>
                            Upload Affiliation Document{" "}
                            {isFieldRequired("isAffiliated") && (
                              <span className="text-red-700">*</span>
                            )}
                          </Label>
                          <p className="text-sm text-gray-500 mb-2">
                            Please upload proof of your affiliation (PDF, JPG,
                            PNG)
                          </p>
                          <FileUpload
                            onFileChange={handleFAffiliationFileChange}
                            acceptedFileTypes={[
                              "application/pdf",
                              "image/jpeg",
                              "image/png",
                            ]}
                            maxSizeMB={5}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* For other roles, no additional fields needed */}
                  {!needsCAC && !needsAffiliation && (
                    <p className="text-sm text-gray-600">
                      No additional verification is required for your selected
                      role. You can proceed with your application.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : `${isUpdate ? "Update" : "Submit"} Application`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onConfirm={handleConfirmSubmission}
        data={{
          role,
          fullName: `${user?.name ?? ""} ${user?.surname ?? ""}`.trim(),
          email: user.email as string,
          phone: user.phone as string,
          cacNumber,
          nin,
          isAffiliated,
          document: documentReview,
          affiliationDocument: affiliationDocumentReview,
        }}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}
