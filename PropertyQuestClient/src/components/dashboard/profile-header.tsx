"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Upload, Plus } from "lucide-react";
import { useCurrentUserStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { useClient } from "@/hooks/useClient";
import { useToast } from "@/components/ui/toast";
import {
  getErrorMessage,
  isValidationError,
  getValidationErrors,
  getAvatarUrl,
} from "@/utils/utils";
import { nodeEnv, vercelEnv } from "@/utils/baseUrl";
import { JSONSafeParse } from "@/utils/utils";
import { UserAttr } from "@/interfaces/user.interface";

export default function ProfileHeader() {
  const { user, setUser } = useCurrentUserStore();
  const { addToast } = useToast();
  const client = useClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Preview
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const result = await client.multiPartPost(
        `/profile/upload-profile-picture/${user.userId}`,
        formData
      );

      addToast({
        title: "Profile Photo",
        description: "Your photo has been successfully uploaded",
        type: "success",
        position: "bottom-center",
      });

      setUser(result.data.data.user);

      setIsSubmitting(false);
      setPreviewUrl(null);
      setSelectedFile(null);
    } catch (error: unknown) {
      console.error("Error submitting uploading photo:", error);
      const title = getErrorMessage(error);
      addToast({
        title: "Failed to upload photo",
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

  const handleRemove = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const location = JSONSafeParse(user?.location) as UserAttr["location"];
  const professionalInfo = JSONSafeParse(
    user?.professionalInfo
  ) as UserAttr["professionalInfo"];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative group">
            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
              <Image
                src={
                  previewUrl
                    ? previewUrl
                    : vercelEnv === "production" || nodeEnv === "production"
                    ? (user?.avatarUrl as string)
                    : getAvatarUrl(user?.avatarUrl) ?? "/default-avatar.png"
                }
                alt="Profile picture"
                width={128}
                height={128}
                className="object-cover h-full w-full"
              />
              <button
                type="button"
                className="absolute bottom-1 right-5 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition"
                onClick={handlePlusClick}
              >
                <Plus className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="mt-2 flex gap-2 justify-center items-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleUpload}
                disabled={!selectedFile || isSubmitting}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isSubmitting ? <span>Uploading...</span> : "Upload"}
              </Button>
              {!user?.avatarUrl && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h2 className="text-2xl font-bold">
                {user?.name} {user?.surname}
              </h2>
              <Badge className="self-center md:self-auto">Premium Agent</Badge>
            </div>

            <p className="text-gray-500 mt-1 max-w-2xl">
              {professionalInfo?.bio}
            </p>

            <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  {location?.state}, {location?.city}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{user?.phone || "Nil"}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
