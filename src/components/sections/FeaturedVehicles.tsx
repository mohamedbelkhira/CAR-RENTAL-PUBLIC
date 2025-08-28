'use client';

import { useState } from 'react';
import { VehicleCard } from "../common/VehicleCard";
import { AvailabilityFilter } from '../common/AvailabilityFilter';
import { tenantService } from '@/services/tenant.service';

interface VehicleImage {
  id: number;
  vehicle_id: number;
  image_path: string;
  note: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface Vehicle {
  id: number;
  tenant_id: number;
  brand: string;
  model: string;
  year: string;
  category: string;
  transmission: string;
  daily_rate: string;
  license_plate: string;
  vin_number: string;
  fuel_type: string;
  current_mileage: number;
  color: string;
  seats: number;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: VehicleImage[];
}

interface FeaturedVehiclesProps {
  tenantId: number;
  tenantSlug: string;
  tenantBrandColor: string;
  vehicles: Vehicle[];
  baseUrl?: string;
}

export function FeaturedVehicles({ 
  tenantId,
  tenantSlug, 
  tenantBrandColor, 
  vehicles: initialVehicles, 
  baseUrl = "http://srv673142.hstgr.cloud" 
}: FeaturedVehiclesProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilterChange = async (startDate: string, endDate: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const filteredVehicles = await tenantService.getTenantVehiclesAvailability(
        tenantSlug,
        startDate || undefined,
        endDate || undefined
      );
      setVehicles(filteredVehicles);
    } catch (err) {
      setError('Erreur lors du chargement des véhicules. Veuillez réessayer.');
      console.error('Error filtering vehicles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nos Véhicules en Vedette
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choisissez parmi notre flotte diversifiée de véhicules bien entretenus pour répondre à vos besoins
          </p>
        </div>

        {/* Availability Filter */}
        <AvailabilityFilter 
          onFilterChange={handleFilterChange}
          isLoading={isLoading}
          tenantBrandColor={tenantBrandColor}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
            <span className="ml-3 text-gray-600">Chargement des véhicules...</span>
          </div>
        )}

        {/* Vehicles Grid */}
        {!isLoading && (
          <>
            {vehicles.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun véhicule disponible
                </h3>
                <p className="text-gray-600">
                  Aucun véhicule ne correspond à vos critères de recherche pour les dates sélectionnées.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    tenantSlug={tenantSlug}
                    tenantId={tenantId}
                    tenantBrandColor={tenantBrandColor}
                    baseUrl={baseUrl}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}