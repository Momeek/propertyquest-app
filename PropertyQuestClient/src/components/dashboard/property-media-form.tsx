"use client";
import React from "react";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, X, Plus, GripVertical } from "lucide-react";
import { PropertyAttr } from "@/interfaces/property.interface";
import { useToast } from "../ui/toast";
import { nodeEnv, vercelEnv } from "@/utils/baseUrl";
import { getPropertyImagesUrl, getFloorPhotoUrl } from "@/utils/utils";

interface PropertyMediaFormProps {
  data?: Partial<PropertyAttr["media"]>;
  updateData: (data: Partial<PropertyAttr["media"]>) => void;
  onNext: () => void;
  onPrevious: () => void;
  saveDraft: () => void;
  isEditing?: boolean;
}

interface ImageItem {
  id: string;
  url: string;
  file?: File;
  isFeatured: boolean;
  isExisting?: boolean; // Mark existing images
}

export default function PropertyMediaForm({
  data = {},
  updateData,
  onNext,
  onPrevious,
  saveDraft,
  isEditing,
}: PropertyMediaFormProps) {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    images: ImageItem[];
    videoTourUrl: string;
    virtualTourUrl: string;
    floorPlan: { id?: string; url?: string; file?: File; isExisting?: boolean };
  }>(() => {
    // Initialize with existing images if in edit mode
    const images: ImageItem[] = [];

    if (data?.images && Array.isArray(data.images)) {
      data.images.forEach((img, index) => {
        if (img) {
          images.push({
            id: img.id || `existing-${index}-${Date.now()}`,
            url: img.url || "",
            isFeatured: img.isFeatured || false,
            isExisting: true, // Mark as existing
          });
        }
      });
    }

    return {
      images,
      videoTourUrl: data?.videoTourUrl || "",
      virtualTourUrl: data?.virtualTourUrl || "",
      floorPlan:
        data?.floorPlan && data.floorPlan.url
          ? {
              id: `floor-${Date.now()}`,
              url: data.floorPlan.url || "",
              isExisting: true,
            }
          : {},
    };
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const floorPlanInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data && data.images) {
      const images: ImageItem[] = [];

      if (Array.isArray(data.images)) {
        data.images.forEach((img, index) => {
          if (img) {
            images.push({
              id: img.id || `existing-${index}-${Date.now()}`,
              url: img.url || "",
              isFeatured: img.isFeatured || false,
              isExisting: true,
            });
          }
        });
      }

      setFormData((prev) => ({
        ...prev,
        images,
        videoTourUrl: data.videoTourUrl || "",
        virtualTourUrl: data.virtualTourUrl || "",
        floorPlan:
          data?.floorPlan && data.floorPlan.url
            ? {
                id: `floor-${Date.now()}`,
                url: data.floorPlan.url || "",
                isExisting: true,
              }
            : {},
      }));
    }
  }, [data]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name} (too large)`);
      } else if (
        !["image/jpeg", "image/png", "image/webp"].includes(file.type)
      ) {
        invalidFiles.push(`${file.name} (invalid format)`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      addToast({
        title: "Invalid files",
        description: `The following files were not uploaded: ${invalidFiles.join(
          ", "
        )}`,
        type: "error",
        position: "top-center",
      });
    }

    if (validFiles.length > 0) {
      const newImages = validFiles.map((file, index) => ({
        id: `temp-${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        file,
        isFeatured: formData.images.length === 0 && index === 0,
        isExisting: false,
      }));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFloorPlanUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      addToast({
        title: "File too large",
        description: "Floor plan must be less than 5MB",
        type: "error",
        position: "top-center",
      });
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      addToast({
        title: "Invalid file format",
        description: "Floor plan must be JPG, PNG, or WEBP",
        type: "error",
        position: "top-center",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      floorPlan: {
        id: `floor-${Date.now()}`,
        url: URL.createObjectURL(file),
        file,
        isExisting: false,
      },
    }));

    if (floorPlanInputRef.current) {
      floorPlanInputRef.current.value = "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeImage = (id: string) => {
    setFormData((prev) => {
      const newImages = prev.images.filter((image) => image.id !== id);
      return {
        ...prev,
        images: newImages,
      };
    });
  };

  const setFeatured = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((image) => ({
        ...image,
        isFeatured: image.id === id,
      })),
    }));
  };

  const getImageSrc = (image: ImageItem): string => {
    // For existing images from database (no file object, URL is from database)
    if (image.isExisting && image.url) {
      if (vercelEnv === "production" || nodeEnv === "production") {
        return image.url;
      }
      // In development, construct the proper URL
      return getPropertyImagesUrl(image.url) || "/placeholder.svg";
    }

    // For newly uploaded images (object URL)
    if (!image.isExisting && image.url) {
      return image.url;
    }

    return "/placeholder.svg";
  };

  const getFloorImageSrc = (floorPlan: {
    id?: string;
    url?: string;
    file?: File;
    isExisting?: boolean;
  }): string => {
    // For existing floor plan from database
    if (floorPlan.isExisting && floorPlan.url) {
      if (vercelEnv === "production" || nodeEnv === "production") {
        return floorPlan.url;
      }
      return getFloorPhotoUrl(floorPlan.url) || "/placeholder.svg";
    }
    // For newly uploaded floor plan
    if (!floorPlan.isExisting && floorPlan.url) {
      return floorPlan.url;
    }
    return "/placeholder.svg";
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerFloorPlanInput = () => {
    floorPlanInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Transform data back to match PropertyAttr["media"] interface
    const mediaData: Partial<PropertyAttr["media"]> = {
      images: formData.images.map((img) => ({
        id: img.id,
        url: img.url,
        file: img.file,
        isFeatured: img.isFeatured,
      })),
      videoTourUrl: formData.videoTourUrl,
      virtualTourUrl: formData.virtualTourUrl,
      floorPlan: formData.floorPlan.url
        ? {
            url: formData.floorPlan.url,
            file: formData.floorPlan.file,
          }
        : {},
    };

    updateData(mediaData);
    onNext();
  };

  const handleSaveDraft = () => {
    const mediaData: Partial<PropertyAttr["media"]> = {
      images: formData.images.map((img) => ({
        id: img.id,
        url: img.url,
        file: img.file,
        isFeatured: img.isFeatured,
      })),
      videoTourUrl: formData.videoTourUrl,
      virtualTourUrl: formData.virtualTourUrl,
      floorPlan: formData.floorPlan.url
        ? {
            url: formData.floorPlan.url,
            file: formData.floorPlan.file,
          }
        : {},
    };

    updateData(mediaData);
    saveDraft();
  };

  const existingImages = formData.images.filter((img) => img.isExisting);
  const newImages = formData.images.filter((img) => !img.isExisting);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="file"
        name="images"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/jpeg, image/png, image/webp"
        multiple
        className="hidden"
      />
      <input
        type="file"
        name="floorPhoto"
        ref={floorPlanInputRef}
        onChange={handleFloorPlanUpload}
        accept="image/jpeg, image/png, image/webp"
        className="hidden"
      />

      {/* Property Images Section */}
      <div className="space-y-2">
        <Label className="text-lg font-medium">
          {isEditing ? "Update Property Images" : "Property Images"}
        </Label>
        <p className="text-sm text-gray-500">
          Upload high-quality images of your property. The first image will be
          used as the featured image.
        </p>

        {/* Edit Mode: Show existing images section */}
        {isEditing && existingImages.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-600">Current Images</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {existingImages.map((image) => (
                <div
                  key={image.id}
                  className="relative group border rounded-lg overflow-hidden"
                >
                  <div className="absolute top-2 left-2 z-10 flex gap-1">
                    <button
                      type="button"
                      className="p-1 bg-black/50 rounded text-white hover:bg-black/70"
                    >
                      <GripVertical className="h-4 w-4" />
                    </button>
                    {image.isFeatured && (
                      <span className="px-2 py-1 bg-primary text-white text-xs rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      type="button"
                      className="p-1 bg-black/50 rounded text-white hover:bg-black/70"
                      onClick={() => removeImage(image.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Image
                    src={getImageSrc(image)}
                    alt="Property image preview"
                    width={300}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {!image.isFeatured && (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setFeatured(image.id)}
                      >
                        Set as Featured
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Mode: Show new images section */}
        {isEditing && newImages.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-600">New Images</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newImages.map((image) => (
                <div
                  key={image.id}
                  className="relative group border rounded-lg overflow-hidden"
                >
                  <div className="absolute top-2 left-2 z-10 flex gap-1">
                    <button
                      type="button"
                      className="p-1 bg-black/50 rounded text-white hover:bg-black/70"
                    >
                      <GripVertical className="h-4 w-4" />
                    </button>
                    {image.isFeatured && (
                      <span className="px-2 py-1 bg-primary text-white text-xs rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      type="button"
                      className="p-1 bg-black/50 rounded text-white hover:bg-black/70"
                      onClick={() => removeImage(image.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Image
                    src={image.url}
                    alt="Property image preview"
                    width={300}
                    height={200}
                    className="object-cover w-full h-40"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {!image.isFeatured && (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setFeatured(image.id)}
                      >
                        Set as Featured
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Area - Always show in edit mode, conditional in create mode */}
        {isEditing ? (
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={triggerFileInput}
          >
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-2">Click to browse</p>
            <p className="text-xs text-gray-400 mb-4">
              Supported formats: JPG, PNG, WEBP. Max size: 5MB per image.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Update Images
            </Button>
          </div>
        ) : (
          <>
            {formData?.images?.length < 3 && (
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={triggerFileInput}
              >
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-2">Click to browse</p>
                <p className="text-xs text-gray-400 mb-4">
                  Supported formats: JPG, PNG, WEBP. Max size: 5MB per image.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileInput();
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Images
                </Button>
              </div>
            )}
          </>
        )}

        {/* Show all images in create mode */}
        {!isEditing && formData.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {formData.images.map((image) => (
              <div
                key={image.id}
                className="relative group border rounded-lg overflow-hidden"
              >
                <div className="absolute top-2 left-2 z-10 flex gap-1">
                  <button
                    type="button"
                    className="p-1 bg-black/50 rounded text-white hover:bg-black/70"
                  >
                    <GripVertical className="h-4 w-4" />
                  </button>
                  {image.isFeatured && (
                    <span className="px-2 py-1 bg-primary text-white text-xs rounded">
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2 z-10">
                  <button
                    type="button"
                    className="p-1 bg-black/50 rounded text-white hover:bg-black/70"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <Image
                  src={getImageSrc(image)}
                  alt="Property image preview"
                  width={300}
                  height={200}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {!image.isFeatured && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setFeatured(image.id)}
                    >
                      Set as Featured
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="videoTourUrl">Video Tour URL (optional)</Label>
        <Input
          id="videoTourUrl"
          name="videoTourUrl"
          value={formData.videoTourUrl}
          type="url"
          onChange={handleChange}
          placeholder="e.g. https://youtube.com/property"
        />
        <p className="text-xs text-gray-500">
          Add a YouTube video link of your property if available.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="virtualTour">Virtual Tour URL (optional)</Label>
        <Input
          id="virtualTourUrl"
          name="virtualTourUrl"
          value={formData.virtualTourUrl}
          type="url"
          onChange={handleChange}
          placeholder="e.g. https://my-virtual-tour.com/property"
        />
        <p className="text-xs text-gray-500">
          Add a link to a 3D virtual tour of your property if available.
        </p>
      </div>

      {/* Floor Plan Section */}
      <div className="space-y-2">
        <Label htmlFor="floorPlan">Floor Plan (optional)</Label>

        {/* Show existing floor plan if editing */}
        {isEditing &&
          formData.floorPlan.url &&
          formData.floorPlan.isExisting && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-600">
                Current Floor Plan
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative group border rounded-lg overflow-hidden">
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      type="button"
                      className="p-1 bg-black/50 rounded text-white hover:bg-black/70"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData((prev) => ({ ...prev, floorPlan: {} }));
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Image
                    src={getFloorImageSrc(formData.floorPlan)}
                    alt="Floor plan preview"
                    width={300}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}

        {/* Show new floor plan if editing */}
        {isEditing &&
          formData.floorPlan.url &&
          !formData.floorPlan.isExisting && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-600">
                New Floor Plan
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative group border rounded-lg overflow-hidden">
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      type="button"
                      className="p-1 bg-black/50 rounded text-white hover:bg-black/70"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData((prev) => ({ ...prev, floorPlan: {} }));
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Image
                    src={formData?.floorPlan?.url as string}
                    alt="Floor plan preview"
                    width={300}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}

        {/* Upload area - Always show in edit mode, conditional in create mode */}
        {isEditing || !formData.floorPlan.url ? (
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={triggerFloorPlanInput}
          >
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-2">
              {isEditing ? "Upload new floor plan" : "Upload floor plan image"}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                triggerFloorPlanInput();
              }}
            >
              {isEditing ? "Update Floor Plan" : "Add Floor Plan"}
            </Button>
          </div>
        ) : null}
      </div>

      <div className="flex justify-between gap-2">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous: Details
        </Button>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || formData.images.length === 0}
          >
            {isSubmitting ? "Saving..." : "Next: Location"}
          </Button>
        </div>
      </div>
    </form>
  );
}