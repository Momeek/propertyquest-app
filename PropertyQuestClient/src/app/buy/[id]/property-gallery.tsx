"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Maximize2, Video } from "lucide-react";
import { getPropertyImagesUrl } from "@/utils/utils";
import LazyImage from "@/components/ui/lazyImage";
import { nodeEnv, vercelEnv } from "@/utils/baseUrl";

interface PropertyGalleryProps {
  images: {
    url?: string;
    isFeatured: boolean;
  }[]; // Allow both string URLs and objects with isFeatured
  hasVideo?: boolean;
}

export default function PropertyGallery({
  images,
  hasVideo = false,
}: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="relative bg-white rounded-lg overflow-hidden border border-[#b6b3b3]">
        {/* Main Image */}
        <div className="relative h-[400px] md:h-[500px]">
          <LazyImage
            src={
              vercelEnv === "production" || nodeEnv === "production"
                ? (images[currentIndex]?.url as string)
                : getPropertyImagesUrl(images[currentIndex]?.url as string) ??
                  "/placeholder.svg"
            }
            alt="property-image"
            imageFit="object-contain"
          />

          {/* Video Badge */}
          {hasVideo && (
            <div className="absolute top-4 left-4">
              <Button
                variant="secondary"
                size="sm"
                className="gap-1 bg-gray-100"
              >
                <Video className="h-4 w-4" />
                Watch Video
              </Button>
            </div>
          )}

          {/* Fullscreen Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize2 className="h-10 w-10" />
          </Button>

          {/* Navigation Arrows */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            onClick={prevImage}
          >
            <ChevronLeft className="h-10 w-10" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={nextImage}
          >
            <ChevronRight className="h-10 w-10" />
          </Button>
        </div>

        {/* Thumbnails */}
        <div className="flex overflow-x-auto justify-center p-4 gap-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative h-16 w-24 flex-shrink-0 rounded overflow-hidden border-2 ${
                index === currentIndex
                  ? "border-[#16a249]"
                  : "border-transparent"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <LazyImage
                src={
                  vercelEnv === "production" || nodeEnv === "production"
                    ? (image?.url as string)
                    : getPropertyImagesUrl(image?.url as string) ??
                      "/placeholder.svg"
                }
                alt="Thumbnail-property-image"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Gallery Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-5xl p-0 bg-black">
          <div className="relative h-[80vh]">
            <LazyImage
              src={
                vercelEnv === "production" || nodeEnv === "production"
                  ? (images[currentIndex]?.url as string)
                  : getPropertyImagesUrl(images[currentIndex]?.url as string) ??
                    "/placeholder.svg"
              }
              alt="property-image"
              imageFit="object-contain"
            />

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeft className="h-10 w-10 text-[#16a249]" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="h-10 w-10 text-[#16a249]" />
            </Button>
          </div>

          <div className="bg-black p-4 text-white text-center">
            Image {currentIndex + 1} of {images.length}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
