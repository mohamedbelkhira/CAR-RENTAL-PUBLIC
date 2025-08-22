'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Shield } from 'lucide-react';
import { Vehicle } from '@/types/tenant.types';

// Importer les nouveaux composants
import { VehicleImageGallery } from '@/components/vehicle-detail/VehicleImageGallery';
import { VehicleSpecifications } from '@/components/vehicle-detail/VehicleSpecifications';
import { ReservationForm } from '@/components/vehicle-detail/ReservationForm';

interface VehicleDetailPageProps {
  vehicle: Vehicle;
  tenantSlug: string;
  tenantBrandColor: string;
  tenantId: number; 
  baseUrl?: string;
}

// Les fonctions utilitaires peuvent rester ici ou être déplacées dans un fichier `utils`
const formatPrice = (price: string) => {
  const numericPrice = parseFloat(price);
  return new Intl.NumberFormat('fr-DZ', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(numericPrice);
};

const formatMileage = (mileage: number) => new Intl.NumberFormat('fr-FR').format(mileage);

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export function VehicleDetailPage({ 
  vehicle, 
  tenantSlug, 
  tenantBrandColor, 
  tenantId, 
  baseUrl 
}: VehicleDetailPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/rental/${tenantSlug}`} className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux véhicules
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Composant pour la galerie d'images */}
          <VehicleImageGallery 
            images={vehicle.images}
            vehicleName={`${vehicle.brand} ${vehicle.model}`}
          />

          <div className="space-y-6">
            {/* Titre et Prix */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {capitalize(vehicle.brand)} {capitalize(vehicle.model)}
              </h1>
              <div className="flex items-center justify-between">
                <p className="text-xl text-gray-600">{capitalize(vehicle.category)} • {vehicle.year}</p>
                <div className="text-right">
                  <div className="text-3xl font-bold" style={{ color: tenantBrandColor }}>
                    {formatPrice(vehicle.daily_rate)} DA
                  </div>
                  <div className="text-gray-600">par jour</div>
                </div>
              </div>
            </div>

            {/* Updated Reservation Form with new props */}
            <ReservationForm 
              tenantBrandColor={tenantBrandColor}
              dailyRate={parseFloat(vehicle.daily_rate)}
              vehicleId={vehicle.id}
              tenantId={tenantId}
              baseUrl={baseUrl}
            />

            {/* Composant pour les spécifications */}
            <VehicleSpecifications 
              vehicle={vehicle}
              formatMileage={formatMileage}
              capitalize={capitalize}
            />

            {/* Description */}
            {vehicle.description && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
              </div>
            )}
            
            {/* Autres Informations */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations du véhicule</h2>
              <div className="space-y-3">
                 <div className="flex items-center space-x-3">
                   <MapPin className="h-5 w-5 text-gray-400" />
                   <div>
                     <span className="text-gray-600">Plaque d'immatriculation:</span>
                     <span className="ml-2 font-medium">{vehicle.license_plate}</span>
                   </div>
                 </div>
                 <div className="flex items-center space-x-3">
                   <Shield className="h-5 w-5 text-gray-400" />
                   <div>
                     <span className="text-gray-600">Numéro VIN:</span>
                     <span className="ml-2 font-medium font-mono text-sm">{vehicle.vin_number}</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}