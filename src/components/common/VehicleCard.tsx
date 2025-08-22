'use client';

import Link from 'next/link';
import { Car } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { VehicleImage } from '@/types/tenant.types';
import { Vehicle } from '@/types/tenant.types';

interface VehicleCardProps {
  vehicle: Vehicle;
  tenantSlug: string;
  tenantId: number;
  tenantBrandColor: string;
  baseUrl?: string; // For constructing full image URLs
}

export function VehicleCard({ vehicle, tenantSlug, tenantBrandColor, baseUrl = "http://srv673142.hstgr.cloud" }: VehicleCardProps) {
  const [imageError, setImageError] = useState(false);

  // Format the daily rate to show in DA
  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('fr-DZ', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numericPrice);
  };

  // Format mileage
  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('fr-FR').format(mileage);
  };

  // Capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Get the first image or use placeholder
  const primaryImage = vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : null;
  const imageUrl = primaryImage ? `${baseUrl}${primaryImage.image_path}` : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Vehicle Image */}
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden">
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <Car className="h-16 w-16 text-gray-400" />
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {capitalize(vehicle.brand)} {capitalize(vehicle.model)}
            </h3>
            <p className="text-gray-600">{capitalize(vehicle.category)} • {vehicle.year}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold" style={{ color: tenantBrandColor }}>
              {formatPrice(vehicle.daily_rate)} DA
            </div>
            <div className="text-sm text-gray-600">par jour</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>{capitalize(vehicle.transmission)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>{formatMileage(vehicle.current_mileage)} km</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>{capitalize(vehicle.color)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>{vehicle.seats} Places</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <Link
            href={`/rental/${tenantSlug}/vehicles/${vehicle.id}`}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Voir Détails
          </Link>
          <Link
            href={`/rental/${tenantSlug}/request?vehicle_id=${vehicle.id}`}
            className="flex-1 py-2 px-4 rounded-lg text-center font-medium text-white transition-colors"
            style={{ backgroundColor: tenantBrandColor }}
          >
            Réserver Maintenant
          </Link>
        </div>
      </div>
    </div>
  );
}