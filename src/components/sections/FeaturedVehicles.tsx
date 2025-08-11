
import Link from 'next/link';
import { Car, Users, Fuel, Settings } from 'lucide-react';

interface FeaturedVehiclesProps {
  tenantSlug: string;
  tenantBrandColor: string;
}

// Mock vehicle data for placeholder
const mockVehicles = [
  {
    id: 1,
    name: 'Economy Car',
    category: 'Economy',
    image: '/placeholder-car-1.jpg',
    price: 35,
    features: ['4 Seats', 'Manual', 'Gasoline', 'AC']
  },
  {
    id: 2,
    name: 'Compact SUV',
    category: 'SUV',
    image: '/placeholder-car-2.jpg',
    price: 65,
    features: ['5 Seats', 'Automatic', 'Gasoline', 'GPS']
  },
  {
    id: 3,
    name: 'Luxury Sedan',
    category: 'Luxury',
    image: '/placeholder-car-3.jpg',
    price: 95,
    features: ['5 Seats', 'Automatic', 'Premium', 'Leather']
  },
  {
    id: 4,
    name: 'Family Van',
    category: 'Van',
    image: '/placeholder-car-4.jpg',
    price: 85,
    features: ['7 Seats', 'Automatic', 'Spacious', 'Safety']
  },
  {
    id: 5,
    name: 'Sports Car',
    category: 'Sports',
    image: '/placeholder-car-5.jpg',
    price: 150,
    features: ['2 Seats', 'Manual', 'Turbo', 'Performance']
  },
  {
    id: 6,
    name: 'Electric Car',
    category: 'Electric',
    image: '/placeholder-car-6.jpg',
    price: 75,
    features: ['4 Seats', 'Auto', 'Electric', 'Eco-Friendly']
  }
];

export function FeaturedVehicles({ tenantSlug, tenantBrandColor }: FeaturedVehiclesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Featured Vehicles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse fleet of well-maintained vehicles to suit your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Placeholder Image */}
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Car className="h-16 w-16 text-gray-400" />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                    <p className="text-gray-600">{vehicle.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: tenantBrandColor }}>
                      ${vehicle.price}
                    </div>
                    <div className="text-sm text-gray-600">per day</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Link
                    href={`/rental/${tenantSlug}/vehicles/${vehicle.id}`}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/rental/${tenantSlug}/request?vehicle_id=${vehicle.id}`}
                    className="flex-1 py-2 px-4 rounded-lg text-center font-medium text-white transition-colors"
                    style={{ backgroundColor: tenantBrandColor }}
                  >
                    Request Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/rental/${tenantSlug}/vehicles`}
            className="inline-flex items-center px-8 py-3 border border-transparent rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: tenantBrandColor }}
          >
            View All Vehicles
          </Link>
        </div>
      </div>
    </section>
  );
}
