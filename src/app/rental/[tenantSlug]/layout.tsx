

// src/app/rental/[tenantSlug]/layout.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tenantService } from '@/services/tenant.service';
import { TenantNavigation } from '@/components/layout/TenantNavigation';
import { TenantFooter } from '@/components/layout/TenantFooter';

// Define the props for our layout component
interface TenantLayoutProps {
  children: React.ReactNode;
  tenant: Awaited<ReturnType<typeof tenantService.getTenantBasic>>;
}

// 1. generateMetadata function is correct as is. It fetches data separately.
// Next.js handles this, and this is the only place it should be done for metadata.
export async function generateMetadata({
  params,
}: {
  params: { tenantSlug: string };
}): Promise<Metadata> {
  try {
    const tenant = await tenantService.getTenantBasic(params.tenantSlug);
    if (!tenant) {
      return { title: 'Tenant Not Found' };
    }
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

// 2. We create a new async function that will be the default export.
// This function will handle the data fetching and error states.
export default async function TenantLayoutWrapper({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenantSlug: string };
}) {
  const { tenantSlug } = params;

  try {
    const tenant = await tenantService.getTenantBasic(tenantSlug);

    if (!tenant) {
      // In a real application, you'd show a 404 page or redirect
      // You can also use notFound() to trigger the not-found page
      notFound();
    }

    // Pass the fetched tenant data to the layout component
    return (
      <TenantLayout tenant={tenant}>{children}</TenantLayout>
    );
  } catch (error) {
    // Handle the case where the API call fails (e.g., network error, 404)
    console.error('Failed to fetch tenant data:', error);
    notFound(); // Use notFound() to show the default not-found page
  }
}

// 3. The actual TenantLayout component is no longer an async function
// and simply receives the fetched data as a prop.
function TenantLayout({ children, tenant }: TenantLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Assuming TenantNavigation and TenantFooter handle the tenant prop */}
      <TenantNavigation tenant={tenant} tenantSlug={tenant.slug} />
      <main className="flex-1">
        {children}
      </main>
      <TenantFooter tenant={tenant} />
    </div>
  );
}