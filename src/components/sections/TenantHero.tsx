
import Image from 'next/image';
import Link from 'next/link';
import { TenantSettings } from '@/types/tenant.types';
import { Car, Clock, Shield, Star } from 'lucide-react';

interface TenantHeroProps {
  tenant: TenantSettings;
}

export function TenantHero({ tenant }: TenantHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Background image */}
      {tenant.banner_image && (
        <div className="absolute inset-0">
          <Image
            src={tenant.banner_image}
            alt={`${tenant.name} banner`}
            fill
            className="object-cover opacity-30"
          />
        </div>
      )}
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Welcome to{' '}
                <span style={{ color: tenant.brand_color }}>
                  {tenant.name}
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {tenant.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${tenant.brand_color}20` }}
                >
                  <Car className="h-6 w-6" style={{ color: tenant.brand_color }} />
                </div>
                <div>
                  <h3 className="font-semibold">Premium Fleet</h3>
                  <p className="text-sm text-gray-300">Quality vehicles</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${tenant.brand_color}20` }}
                >
                  <Clock className="h-6 w-6" style={{ color: tenant.brand_color }} />
                </div>
                <div>
                  <h3 className="font-semibold">24/7 Support</h3>
                  <p className="text-sm text-gray-300">Always available</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${tenant.brand_color}20` }}
                >
                  <Shield className="h-6 w-6" style={{ color: tenant.brand_color }} />
                </div>
                <div>
                  <h3 className="font-semibold">Fully Insured</h3>
                  <p className="text-sm text-gray-300">Complete protection</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${tenant.brand_color}20` }}
                >
                  <Star className="h-6 w-6" style={{ color: tenant.brand_color }} />
                </div>
                <div>
                  <h3 className="font-semibold">Top Rated</h3>
                  <p className="text-sm text-gray-300">Customer choice</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/rental/${tenant.slug}/vehicles`}
                className="px-8 py-4 rounded-lg font-semibold text-center transition-colors"
                style={{ backgroundColor: tenant.brand_color }}
              >
                View Our Fleet
              </Link>
              <Link
                href={`/rental/${tenant.slug}/request`}
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-center hover:bg-white hover:text-gray-900 transition-colors"
              >
                Get Quick Quote
              </Link>
            </div>
          </div>

          {/* Image/Stats */}
          <div className="lg:text-right">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold">Why Choose Us?</h2>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold" style={{ color: tenant.brand_color }}>50+</div>
                  <div className="text-sm text-gray-300">Vehicles Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: tenant.brand_color }}>1000+</div>
                  <div className="text-sm text-gray-300">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: tenant.brand_color }}>24/7</div>
                  <div className="text-sm text-gray-300">Customer Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: tenant.brand_color }}>5★</div>
                  <div className="text-sm text-gray-300">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}