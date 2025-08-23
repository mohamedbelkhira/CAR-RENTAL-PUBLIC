// src/components/sections/TenantHero.tsx

import Image from 'next/image';
import { TenantSettings } from '@/types/tenant.types';
import { Clock, MapPin, Phone, Mail, Star, Award, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TenantHeroProps {
  tenant: TenantSettings;
}

export function TenantHero({ tenant }: TenantHeroProps) {
  const APP_URL = 'http://srv673142.hstgr.cloud';
  const defaultBannerImage = '/images/banner.png';
  const defaultProfileImage = '/images/logo.png';

  // Helper function to construct full image URL
  const getImageUrl = (imagePath: string | null, defaultPath: string) => {
    if (!imagePath) return defaultPath;
    // If the path already starts with http, return as is
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise prepend the APP_URL
    return `${APP_URL}${imagePath}`;
  };

  const getTodayOperatingHours = () => {
    const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
    const dayKey = today.charAt(0).toUpperCase() + today.slice(1);
    const todayHours = tenant.operating_hours[dayKey];
   
    if (!todayHours || !todayHours.is_work_day) {
      return { status: 'Fermé aujourd\'hui', isOpen: false };
    }
   
    return { 
      status: `${todayHours.start_time} - ${todayHours.end_time}`, 
      isOpen: true 
    };
  };

  const operatingHours = getTodayOperatingHours();

  return (
    <section className="relative overflow-hidden">
      {/* Banner Section */}
      <div className="relative h-[400px] lg:h-[500px]">
       
          // When there's a custom image, show it without overlay
          <Image
            src={getImageUrl(tenant.banner_image, defaultBannerImage)}
            alt={`${tenant.name} banner`}
            fill
            className="object-cover"
            priority
          />
        
        
        {/* Subtle gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Quality Badge */}
        <div className="absolute top-6 right-6">
          <Badge className="bg-white/90 backdrop-blur-sm text-slate-700 border-0 px-3 py-1.5">
            <Shield className="h-4 w-4 mr-2" />
            Service Premium
          </Badge>
        </div>
      </div>

      {/* Store Information Card */}
      <div className="relative -mt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              
              {/* Logo Section */}
              <div className="flex-shrink-0">
                <div className="relative w-28 h-28 lg:w-36 lg:h-36">
                  <div 
                    className="absolute inset-0 rounded-full p-1"
                    style={{ 
                      background: `linear-gradient(135deg, ${tenant.brand_color}, ${tenant.brand_color}80)` 
                    }}
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                      <Image
                        src={getImageUrl(tenant.profile_image, defaultProfileImage)}
                        alt={`${tenant.name} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Verified Badge */}
                  <div 
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: tenant.brand_color }}
                  >
                    <Award className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Store Details */}
              <div className="flex-1 space-y-6">
                
                {/* Title and Rating */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
                      {tenant.name}
                    </h1>
                    
                    {/* Rating Stars */}
                     {/* <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className="h-5 w-5 fill-yellow-400 text-yellow-400" 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600 font-medium">5.0 (124 avis)</span>
                    </div> */}
                  </div>
                  
                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl">
                    {tenant.description}
                  </p>
                </div>

                <Separator className="bg-slate-200" />

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  
                  {/* Location */}
                  <div className="flex items-start gap-3 group">
                    <div 
                      className="p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${tenant.brand_color}15` }}
                    >
                      <MapPin 
                        className="w-5 h-5" 
                        style={{ color: tenant.brand_color }} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">Adresse</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{tenant.address}</p>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-start gap-3 group">
                    <div 
                      className="p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${tenant.brand_color}15` }}
                    >
                      <Phone 
                        className="w-5 h-5" 
                        style={{ color: tenant.brand_color }} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">Téléphone</p>
                      <p className="text-slate-600 text-sm">{tenant.phone}</p>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start gap-3 group">
                    <div 
                      className="p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${tenant.brand_color}15` }}
                    >
                      <Mail 
                        className="w-5 h-5" 
                        style={{ color: tenant.brand_color }} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">Email</p>
                      <p className="text-slate-600 text-sm break-all">{tenant.email}</p>
                    </div>
                  </div>
                  
                  {/* Operating Hours */}
                  <div className="flex items-start gap-3 group">
                    <div 
                      className="p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${tenant.brand_color}15` }}
                    >
                      <Clock 
                        className="w-5 h-5" 
                        style={{ color: tenant.brand_color }} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">Aujourd'hui</p>
                      <div className="flex items-center gap-2">
                        <p className="text-slate-600 text-sm">{operatingHours.status}</p>
                        <Badge 
                          variant={operatingHours.isOpen ? "default" : "secondary"}
                          className={`text-xs ${
                            operatingHours.isOpen 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }`}
                        >
                          {operatingHours.isOpen ? 'Ouvert' : 'Fermé'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}