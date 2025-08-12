// src/app/rental/[tenantSlug]/layout.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tenantService } from '@/services/tenant.service';
import { TenantNavigation } from '@/components/layout/TenantNavigation';
import { TenantFooter } from '@/components/layout/TenantFooter';

interface TenantLayoutProps {
  children: React.ReactNode;
  tenant: Awaited<ReturnType<typeof tenantService.getTenantSettings>>;
}

export async function generateMetadata({
  params,
}: {
  params: { tenantSlug: string };
}): Promise<Metadata> {
  try {
    const tenant = await tenantService.getTenantSettings(params.tenantSlug);
    if (!tenant) {
      return { title: 'Store Not Found' };
    }
    
    return {
      title: `${tenant.name} - Car Rental`,
      description: tenant.description,
      openGraph: {
        title: `${tenant.name} - Car Rental`,
        description: tenant.description,
        images: tenant.profile_image ? [tenant.profile_image] : [],
        url: tenant.public_url,
      },
      themeColor: tenant.brand_color,
    };
  } catch (error) {
    return {
      title: 'Car Rental Store',
      description: 'Professional car rental services',
    };
  }
}

export default async function TenantLayoutWrapper({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenantSlug: string };
}) {
  const { tenantSlug } = params;

  try {
    const tenant = await tenantService.getTenantSettings(tenantSlug);

    if (!tenant || !tenant.is_active) {
      notFound();
    }

    return <TenantLayout tenant={tenant}>{children}</TenantLayout>;
  } catch (error) {
    console.error('Failed to fetch tenant data:', error);
    notFound();
  }
}

function TenantLayout({ children, tenant }: TenantLayoutProps) {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        '--tenant-brand-color': tenant.brand_color,
      } as React.CSSProperties}
    >
      {/* <TenantNavigation tenant={tenant} /> */}
      <main className="flex-1">{children}</main>
      <TenantFooter tenant={tenant} />
    </div>
  );
}