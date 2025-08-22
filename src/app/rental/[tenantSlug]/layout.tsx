// src/app/rental/[tenantSlug]/layout.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tenantService } from '@/services/tenant.service';
import { TenantFooter } from '@/components/layout/TenantFooter';
import { Providers } from './providers'; // 👈 Importer notre composant client
import { Vehicle } from '@/types/tenant.types'; // 👈 Assurez-vous que le type Vehicle est importé

// generateMetadata reste inchangé...
export async function generateMetadata({ 
    params,
 }: {
    params: { tenantSlug: string };
 }): Promise<Metadata> {
    // ... votre code existant est parfait
}

// 1. On récupère TOUTES les données nécessaires ici
export default async function TenantLayoutWrapper({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { tenantSlug: string };
}) {
    const { tenantSlug } = params;

    try {
        // On utilise Promise.all pour lancer les requêtes en parallèle, c'est plus performant !
        const [tenant, vehicles] = await Promise.all([
            tenantService.getTenantSettings(tenantSlug),
            tenantService.getTenantVehicles(tenantSlug)
        ]);

        if (!tenant || !tenant.is_active) {
            notFound();
        }

        // On passe les données au composant de layout
        return (
            <TenantLayout tenant={tenant} vehicles={vehicles}>
                {children}
            </TenantLayout>
        );

    } catch (error) {
        console.error('Failed to fetch tenant or vehicle data:', error);
        notFound();
    }
}

// 2. On ajoute "vehicles" aux props
interface TenantLayoutProps {
    children: React.ReactNode;
    tenant: Awaited<ReturnType<typeof tenantService.getTenantSettings>>;
    vehicles: Vehicle[]; // 👈 Ajout des véhicules
}

// 3. On utilise le Provider ici pour envelopper "children"
function TenantLayout({ children, tenant, vehicles }: TenantLayoutProps) {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ '--tenant-brand-color': tenant.brand_color } as React.CSSProperties}
        >
            {/* Le Provider enveloppe uniquement les pages, pas le footer ou la nav */}
            <main className="flex-1">
                <Providers vehicles={vehicles}>
                    {children}
                </Providers>
            </main>

            <TenantFooter tenant={tenant} />
        </div>
    );
}