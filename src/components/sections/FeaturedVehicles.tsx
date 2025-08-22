import { VehicleCard } from "../common/VehicleCard";

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
  tenantSlug: string;
  tenantBrandColor: string;
  vehicles: Vehicle[]; // Real vehicles from API
  baseUrl?: string;
}

export function FeaturedVehicles({ 
  tenantSlug, 
  tenantBrandColor, 
  vehicles, 
  baseUrl = "http://srv673142.hstgr.cloud" 
}: FeaturedVehiclesProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              tenantSlug={tenantSlug}
              tenantBrandColor={tenantBrandColor}
              baseUrl={baseUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}