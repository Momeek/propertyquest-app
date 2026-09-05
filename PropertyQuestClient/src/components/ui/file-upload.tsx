"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Upload, X, FileText, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  acceptedFileTypes?: string[];
  maxSizeMB?: number;
}

export function FileUpload({
  onFileChange,
  acceptedFileTypes = ["*/*"],
  maxSizeMB = 10,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    setError(null);

    // Check file type
    if (
      acceptedFileTypes[0] !== "*/*" &&
      !acceptedFileTypes.includes(file.type)
    ) {
      setError(
        `Invalid file type. Accepted types: ${acceptedFileTypes.join(", ")}`
      );
      return false;
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds the maximum allowed size (${maxSizeMB}MB)`);
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        onFileChange(droppedFile);
      } else {
        onFileChange(null);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onFileChange(selectedFile);
      } else {
        onFileChange(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const isImage = file && file.type.startsWith("image/");

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 ${
            dragActive ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <Upload className="h-10 w-10 text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium">
                <button
                  type="button"
                  className="text-primary hover:underline focus:outline-none cursor-pointer"
                  onClick={() => inputRef.current?.click()}
                >
                  Upload your file here
                </button>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Accepted file types: {acceptedFileTypes.join(", ")} (Max size:{" "}
                {maxSizeMB}MB)
              </p>
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={acceptedFileTypes.join(",")}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isImage ? (
                <ImageIcon className="h-8 w-8 text-blue-500" />
              ) : (
                <FileText className="h-8 w-8 text-blue-500" />
              )}
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          {isImage && (
            <div className="mt-3">
              <Image
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt="Preview"
                width={0}
                height={0}
                className="rounded-md mx-auto object-contain"
                style={{ width: "auto" }}
              />
            </div>
          )}
        </div>
      )}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
