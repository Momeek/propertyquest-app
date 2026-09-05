// components/LazyImage.tsx
"use client";
import Image from "next/image";
import { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  imageFit?: string;
}

export default function LazyImage({
  src,
  alt,
  imageFit = "object-cover",
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <Image
          src="/loading-img.png"
          alt="Loading placeholder"
          fill
          className={`object-cover absolute inset-0 z-0`}
        />
      )}

      <Image
        src={src || "/no-img.png"}
        alt={alt}
        fill
        className={`${imageFit} absolute inset-0 transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}
