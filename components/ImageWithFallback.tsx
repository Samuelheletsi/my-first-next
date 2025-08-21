'use client';

import Image from 'next/image';
import { useState } from 'react';
import { isExternalImage, getImageDomain, validateImageUrl } from '@/lib/imageUtils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fallbackSrc: string;
}

const ImageWithFallback = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fallbackSrc
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      const domain = getImageDomain(src);
      console.warn(`Image failed to load: ${src}${domain ? ` (domain: ${domain})` : ''}, falling back to: ${fallbackSrc}`);
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  // Validate the image URL before rendering
  if (!validateImageUrl(src)) {
    console.warn(`Invalid image URL: ${src}`);
    return (
      <div 
        className={`${className} bg-gray-200 flex items-center justify-center`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Invalid image URL</span>
      </div>
    );
  }

  // If the source is already the fallback, don't try to load it again
  if (imgSrc === fallbackSrc && hasError) {
    return (
      <div 
        className={`${className} bg-gray-200 flex items-center justify-center`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleError}
    />
  );
};

export default ImageWithFallback; 