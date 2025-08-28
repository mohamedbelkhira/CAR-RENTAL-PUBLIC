'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Gauge, Palette, Users, Settings, Fuel, MapPin, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Vehicle } from '@/types/tenant.types';

// Import the updated components
import { VehicleImageGallery } from '@/components/vehicle-detail/VehicleImageGallery';
import { ReservationForm } from '@/components/vehicle-detail/ReservationForm';

interface VehicleDetailPageProps {
  vehicle: Vehicle;
  tenantSlug: string;
  tenantBrandColor: string;
  tenantId: number; 
  baseUrl?: string;
}

// Utility functions
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
  const specs = [
    { icon: Calendar, label: "Année", value: vehicle.year },
    { icon: Settings, label: "Transmission", value: capitalize(vehicle.transmission) },
    { icon: Gauge, label: "Kilométrage", value: `${formatMileage(vehicle.current_mileage)} km` },
    { icon: Fuel, label: "Carburant", value: capitalize(vehicle.fuel_type) },
    { icon: Palette, label: "Couleur", value: capitalize(vehicle.color) },
    { icon: Users, label: "Places", value: `${vehicle.seats} personnes` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="hover:bg-slate-100">
            <Link href={`/tenants/${tenantSlug}`} className="inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux véhicules
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column - Images and Specifications */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Vehicle Header Info */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-3xl font-bold text-slate-900">
                        {capitalize(vehicle.brand)} {capitalize(vehicle.model)}
                      </CardTitle>
                      <Badge variant="secondary" className="text-sm">
                        {vehicle.year}
                      </Badge>
                    </div>
                    <CardDescription className="text-lg">
                      {capitalize(vehicle.category)} • Disponible à la location
                    </CardDescription>
                  </div>
                  {vehicle.daily_rate && (
                    <div className="text-right">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold" style={{ color: tenantBrandColor }}>
                          {formatPrice(vehicle.daily_rate)}
                        </span>
                        <span className="text-lg text-slate-600">DA</span>
                      </div>
                      <p className="text-slate-500 text-sm">par jour</p>
                    </div>
                  )}
                  </div>
              </CardHeader>
            </Card>

            {/* Image Gallery */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6">
                <VehicleImageGallery 
                  images={vehicle.images}
                  vehicleName={`${vehicle.brand} ${vehicle.model}`}
                  baseUrl={baseUrl}
                />
              </CardContent>
            </Card>

            {/* Vehicle Specifications */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Spécifications techniques</CardTitle>
                <CardDescription>
                  Détails techniques et caractéristiques du véhicule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {specs.map(({ icon: Icon, label, value }, index) => (
                    <div key={label} className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-slate-100">
                        <Icon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                          {label}
                        </p>
                        <p className="text-lg font-semibold text-slate-900">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Description */}
            {vehicle.description && (
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed text-base">
                    {vehicle.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Vehicle Information */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Informations du véhicule</CardTitle>
                <CardDescription>
                  Détails d'identification et informations légales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <MapPin className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                      Plaque d'immatriculation
                    </p>
                    <p className="text-lg font-semibold text-slate-900 font-mono">
                      {vehicle.license_plate}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <Shield className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                      Numéro VIN
                    </p>
                    <p className="text-sm font-semibold text-slate-900 font-mono break-all">
                      {vehicle.vin_number}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Reservation Form */}
          <div className="xl:col-span-1">
            <div className="sticky top-24">
              <ReservationForm 
                tenantBrandColor={tenantBrandColor}
                dailyRate={parseFloat(vehicle.daily_rate)}
                vehicleId={vehicle.id}
                tenantId={tenantId}
                baseUrl={baseUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}