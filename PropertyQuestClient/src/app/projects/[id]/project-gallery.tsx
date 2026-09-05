"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
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
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt="Project image"
            fill
            className="object-cover"
          />

          {/* Fullscreen Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          {/* Navigation Arrows */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
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
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Gallery Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-5xl p-0 bg-black">
          <div className="relative h-[80vh]">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt="Project image"
              fill
              className="object-contain"
            />

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
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
