
import { Metadata } from 'next';
import { tenantService } from '@/services/tenant.service';
import { TenantNavigation } from '@/components/layout/TenantNavigation';
import { TenantFooter } from '@/components/layout/TenantFooter';

interface TenantLayoutProps {
  children: React.ReactNode;
  params: { tenantSlug: string };
}

export async function generateMetadata(
  { params }: { params: { tenantSlug: string } }
): Promise<Metadata> {
  try {
    const tenant = await tenantService.getTenantBasic(params.tenantSlug);
    
    return {
      title: `${tenant.name}`,
      description: tenant.description,
      openGraph: {
        title: `${tenant.name}`,
        description: tenant.description,
        images: tenant.profile_image ? [tenant.profile_image] : [],
      },
      themeColor: tenant.brand_color,
    };
  } catch (error) {
    return {
      title: 'Car Rental Agency',
      description: 'Professional car rental services',
    };
  }
}

export default async function TenantLayout({
  children,
  params,
}: TenantLayoutProps) {
  try {
    const tenant = await tenantService.getTenantBasic(params.tenantSlug);
    
    return (
      <div className="min-h-screen flex flex-col">
        <TenantNavigation tenant={tenant} tenantSlug={params.tenantSlug} />
        <main className="flex-1">
          {children}
        </main>
        <TenantFooter tenant={tenant} />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Agence de Location non trouvé
          </h1>
          <p className="text-gray-600">
            The requested car rental agency could not be found or is currently inactive.
          </p>
        </div>
      </div>
    );
  }
}