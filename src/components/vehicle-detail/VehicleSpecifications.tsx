import { Calendar, Gauge, Palette, Users, Settings, Fuel } from 'lucide-react';
import { Vehicle } from '@/types/tenant.types';

interface VehicleSpecificationsProps {
  vehicle: Vehicle;
  formatMileage: (mileage: number) => string;
  capitalize: (str: string) => string;
}

export function VehicleSpecifications({ vehicle, formatMileage, capitalize }: VehicleSpecificationsProps) {
  const specs = [
    { icon: Calendar, label: "Année", value: vehicle.year },
    { icon: Settings, label: "Transmission", value: capitalize(vehicle.transmission) },
    { icon: Gauge, label: "Kilométrage", value: `${formatMileage(vehicle.current_mileage)} km` },
    { icon: Fuel, label: "Carburant", value: capitalize(vehicle.fuel_type) },
    { icon: Palette, label: "Couleur", value: capitalize(vehicle.color) },
    { icon: Users, label: "Places", value: `${vehicle.seats} personnes` },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Spécifications</h2>
      <div className="grid grid-cols-2 gap-4">
        {specs.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center space-x-3">
            <Icon className="h-5 w-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-600">{label}</div>
              <div className="font-medium">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}