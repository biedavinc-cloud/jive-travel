import React, { useState, useEffect } from "react";
import { Image } from "@/components/ui/image";

export default function RotatingImage({ images = [], alt = "", className = "", interval = 3500 }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  if (!images.length) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={alt}
          fittingType="fill"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}