// src/app/rental/[tenantSlug]/page.tsx

import { tenantService } from '@/services/tenant.service';
import { TenantHero } from '@/components/sections/TenantHero';
// import { VehiclesPlaceholder } from '@/components/sections/VehiclesPlaceholder';

interface TenantStorePageProps {
  params: { tenantSlug: string };
}

export default async function TenantStorePage({ params }: TenantStorePageProps) {
  try {
    const { tenantSlug } = params;
    const tenant = await tenantService.getTenantSettings(tenantSlug);

    if (!tenant) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Magasin introuvable ou non existant
            </h1>
            <p className="text-gray-600">
              Le magasin que vous recherchez n&apos;existe pas ou n&apos;est plus disponible.
            </p>
          </div>
        </div>
      );
    }

    if (!tenant.is_active) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Magasin temporairement indisponible
            </h1>
            <p className="text-gray-600">
              Ce magasin est actuellement fermé. Veuillez réessayer plus tard.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen">
        {/* Hero Section with Store Info */}
        <TenantHero tenant={tenant} />
        
        {/* Vehicles Section */}
        {/* <VehiclesPlaceholder tenantBrandColor={tenant.brand_color} /> */}
      </div>
    );
  } catch (error) {
    console.error('Error loading tenant store page:', error);
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Erreur de chargement
          </h1>
          <p className="text-gray-600">
            Impossible de charger les informations du magasin. Veuillez réessayer plus tard.
          </p>
        </div>
      </div>
    );
  }
}