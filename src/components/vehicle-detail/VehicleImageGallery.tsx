'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { VehicleImage } from '@/types/tenant.types'; 
interface VehicleImageGalleryProps {
  images: VehicleImage[];
  vehicleName: string;
  baseUrl?: string;
}

export function VehicleImageGallery({ images, vehicleName, baseUrl = "http://srv673142.hstgr.cloud" }: VehicleImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (imageId: number) => {
    setImageErrors(prev => new Set([...prev, imageId]));
  };

  const validImages = images.filter(img => !imageErrors.has(img.id));
  const hasValidImages = validImages.length > 0;

  const goToPrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? validImages.length - 1 : prev - 1);
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prev => prev === validImages.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Viewer */}
      <div className="relative h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
        {hasValidImages ? (
          <>
            <Image
              src={`${baseUrl}${validImages[currentImageIndex].image_path}`}
              alt={vehicleName}
              fill
              className="object-cover"
              onError={() => handleImageError(validImages[currentImageIndex].id)}
            />
            {validImages.length > 1 && (
              <>
                {/* Navigation */}
                <button onClick={goToPrevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={goToNextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {validImages.map((_, index) => (
                    <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Car className="h-20 w-20 text-gray-400" />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {validImages.map((image, index) => (
            <button key={image.id} onClick={() => setCurrentImageIndex(index)} className={`relative h-20 bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${index === currentImageIndex ? 'border-blue-500' : 'border-transparent hover:border-gray-300'}`}>
              <Image
                src={`${baseUrl}${image.image_path}`}
                alt={`${vehicleName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                onError={() => handleImageError(image.id)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}