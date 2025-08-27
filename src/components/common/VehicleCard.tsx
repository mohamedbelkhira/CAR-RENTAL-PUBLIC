'use client';

import Link from 'next/link';
import { Car, Settings, Gauge, Palette, Users,Fuel, Eye, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { VehicleImage } from '@/types/tenant.types';
import { Vehicle } from '@/types/tenant.types';

interface VehicleCardProps {
  vehicle: Vehicle;
  tenantSlug: string;
  tenantId: number;
  tenantBrandColor: string;
  baseUrl?: string;
}

export function VehicleCard({ 
  vehicle, 
  tenantSlug, 
  tenantBrandColor, 
  baseUrl = "http://srv673142.hstgr.cloud" 
}: VehicleCardProps) {
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
  //const imageUrl = primaryImage ? `${baseUrl}${primaryImage.image_path}` : null;
const imageUrl = primaryImage ? `${baseUrl}/storage/${primaryImage.image_path}` : null;
  const specs = [
    { icon: Settings, value: capitalize(vehicle.transmission) },
    { icon: Fuel, value: `${vehicle.fuel_type} ` },
    { icon: Gauge, value: `${formatMileage(vehicle.current_mileage)} km` },
    { icon: Palette, value: capitalize(vehicle.color) },
    
  ];

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm">
      {/* Vehicle Image */} 
      <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {imageUrl && !imageError ? (
          <>
            <Image
              src={imageUrl}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3">
              <Car className="h-12 w-12 text-slate-400 mx-auto" />
              <p className="text-slate-500 text-sm font-medium">Image indisponible</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-700 font-medium"
        >
          {capitalize(vehicle.category)}
        </Badge>

        {/* Year Badge */}
        <Badge 
          variant="outline" 
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border-slate-200"
        >
          <Calendar className="h-3 w-3 mr-1" />
          {vehicle.year}
        </Badge>
      </div>
      
      <CardContent className="p-6 space-y-6">
        {/* Vehicle Title and Price */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
              {capitalize(vehicle.brand)} {capitalize(vehicle.model)}
            </h3>
            <p className="text-slate-600 font-medium">
              Véhicule de location
            </p>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-baseline space-x-1">
              <span 
                className="text-2xl font-bold"
                style={{ color: tenantBrandColor }}
              >
                {formatPrice(vehicle.daily_rate)}
              </span>
              <span className="text-sm text-slate-600">DA</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">par jour</p>
          </div>
        </div>

        <Separator className="bg-slate-200" />

        {/* Vehicle Specifications */}
        <div className="grid grid-cols-2 gap-3">
          {specs.map(({ icon: Icon, value }, index) => (
            <div key={index} className="flex items-center space-x-2 group/spec">
              <div className="p-1.5 rounded-md bg-slate-100 group-hover/spec:bg-slate-200 transition-colors">
                <Icon className="h-3.5 w-3.5 text-slate-600" />
              </div>
              <span className="text-sm font-medium text-slate-700 truncate">
                {value}
              </span>
            </div>
          ))}
        </div>

        <Separator className="bg-slate-200" />

        {/* Action Button */}
        <Button 
          asChild 
          className="w-full h-11 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          style={{ backgroundColor: tenantBrandColor }}
        >
          <Link href={`/tenants/${tenantSlug}/vehicles/${vehicle.id}`}>
            Détails / Réservation
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}