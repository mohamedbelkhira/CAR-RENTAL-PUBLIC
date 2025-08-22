'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Car, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { VehicleImage } from '@/types/tenant.types'; 

interface VehicleImageGalleryProps {
  images: VehicleImage[];
  vehicleName: string;
  baseUrl?: string;
}

export function VehicleImageGallery({ 
  images, 
  vehicleName, 
  baseUrl = "http://srv673142.hstgr.cloud" 
}: VehicleImageGalleryProps) {
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
      <div className="relative h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden group">
        {hasValidImages ? (
          <>
            <Image
              src={`${baseUrl}${validImages[currentImageIndex].image_path}`}
              alt={vehicleName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => handleImageError(validImages[currentImageIndex].id)}
            />
            
            {/* Fullscreen Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm border-0 text-white hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Expand className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
                <div className="relative h-full w-full bg-black rounded-lg overflow-hidden">
                  <Image
                    src={`${baseUrl}${validImages[currentImageIndex].image_path}`}
                    alt={vehicleName}
                    fill
                    className="object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>

            {validImages.length > 1 && (
              <>
                {/* Navigation Buttons */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={goToPrevImage} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm border-0 text-white hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 p-0"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={goToNextImage} 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm border-0 text-white hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 p-0"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {currentImageIndex + 1} / {validImages.length}
                </div>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {validImages.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`} 
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3">
              <Car className="h-16 w-16 text-slate-400 mx-auto" />
              <p className="text-slate-500 font-medium">Aucune image disponible</p>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnails Grid */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {validImages.map((image, index) => (
            <button 
              key={image.id} 
              onClick={() => setCurrentImageIndex(index)}
              className={`relative aspect-square bg-slate-200 rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                index === currentImageIndex 
                  ? 'border-slate-400 ring-2 ring-slate-300 ring-offset-2' 
                  : 'border-transparent hover:border-slate-300'
              }`}
            >
              <Image
                src={`${baseUrl}${image.image_path}`}
                alt={`${vehicleName} - Vue ${index + 1}`}
                fill
                className="object-cover"
                onError={() => handleImageError(image.id)}
              />
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-black/10" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}