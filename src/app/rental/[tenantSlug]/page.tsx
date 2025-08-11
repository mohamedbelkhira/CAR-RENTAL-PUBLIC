
import { tenantService } from '@/services/tenant.service';
import { TenantHero } from '@/components/sections/TenantHero';
import { FeaturedVehicles } from '@/components/sections/FeaturedVehicles';
//import { ContactPreview } from '@/components/sections/ContactPreview';
import { CallToAction } from '@/components/sections/CallToAction';

interface TenantHomeProps {
  params: { tenantSlug: string };
}

export default async function TenantHomePage({ params }: TenantHomeProps) {
  try {
    const [tenant, vehicles] = await Promise.all([
      tenantService.getTenantSettings(params.tenantSlug),
      tenantService.getTenantVehicles(params.tenantSlug)
    ]);
const tenantSlug = 'my-rental-company';
  const tenantBrandColor = '#1a73e8'; // A hex code for the brand color
    return (
      <div className="space-y-16">
        <TenantHero tenant={tenant} />
         <FeaturedVehicles 
        tenantSlug={tenant.tenantSlug} 
        tenantBrandColor={tenant.tenantBrandColor} 
      />
       {/* <ContactPreview tenant={tenant} />*/} 
        <CallToAction tenant={tenant} tenantSlug={params.tenantSlug} />
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Unable to Load Agency Information
        </h1>
        <p className="text-gray-600">
          Please try again later or contact support.
        </p>
      </div>
    );
  }
}