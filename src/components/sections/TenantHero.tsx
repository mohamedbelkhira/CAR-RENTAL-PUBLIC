// src/components/sections/TenantHero.tsx

import Image from 'next/image';
import { TenantSettings } from '@/types/tenant.types';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';

interface TenantHeroProps {
  tenant: TenantSettings;
}

export function TenantHero({ tenant }: TenantHeroProps) {
  const APP_URL = 'http://127.0.0.1:8000';
  const defaultBannerImage = '/images/default-banner.jpg';
  const defaultProfileImage = '/images/default-logo.png';

  // Helper function to construct full image URL
  const getImageUrl = (imagePath: string | null, defaultPath: string) => {
    if (!imagePath) return defaultPath;
    // If the path already starts with http, return as is
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise prepend the APP_URL
    return `${APP_URL}${imagePath}`;
  };

  // const getTodayOperatingHours = () => {
  //   const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
  //   const dayKey = today.charAt(0).toUpperCase() + today.slice(1);
  //   const todayHours = tenant.operating_hours[dayKey];
    
  //   if (!todayHours || !todayHours.is_work_day) {
  //     return 'Fermé aujourd\'hui';
  //   }
    
  //   return `Ouvert: ${todayHours.start_time} - ${todayHours.end_time}`;
  // };

  return (
    <section className="relative">
      {/* Banner Image */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={getImageUrl(tenant.banner_image, defaultBannerImage)}
          alt={`${tenant.name} banner`}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{ backgroundColor: tenant.brand_color }}
        />
        
        {/* Content overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Store Information */}
      <div className="relative -mt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={getImageUrl(tenant.profile_image, defaultProfileImage)}
                  alt={`${tenant.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Store Details */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {tenant.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-4 max-w-2xl">
                {tenant.description}
              </p>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" style={{ color: tenant.brand_color }} />
                  <span>{tenant.address}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" style={{ color: tenant.brand_color }} />
                  <span>{tenant.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" style={{ color: tenant.brand_color }} />
                  <span>{tenant.email}</span>
                </div>
                
                {/* <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" style={{ color: tenant.brand_color }} />
                  <span>{getTodayOperatingHours()}</span>
                </div> */}
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex-shrink-0">
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-2">Contactez-nous</div>
                {/* <div className="flex flex-col gap-1">
                  {tenant.contacts.slice(0, 2).map((contact, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium" style={{ color: tenant.brand_color }}>
                        {contact.label}:
                      </span>
                      <span className="text-gray-600 ml-2">{contact.value}</span>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}