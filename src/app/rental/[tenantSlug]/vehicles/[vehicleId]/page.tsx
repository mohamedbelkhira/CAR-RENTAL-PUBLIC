'use client';

import { useParams } from 'next/navigation';
import { useVehicles } from '@/contexte/VehicleContext';
import { VehicleDetailPage } from './VehicleDetailPage';
import { tenantService } from '@/services/tenant.service'; 
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const vehicles = useVehicles(); 

  const [tenantBrandColor, setTenantBrandColor] = useState('#000000');
  const [tenantId, setTenantId] = useState<number | null>(null); // Add state for tenant ID

  // Extrait les slugs et IDs de l'URL
  const tenantSlug = Array.isArray(params.tenantSlug) ? params.tenantSlug[0] : params.tenantSlug;
  const vehicleId = Array.isArray(params.vehicleId) ? params.vehicleId[0] : params.vehicleId;

  // Trouve le véhicule spécifique dans la liste (sans appel API !)
  const vehicle = vehicles.find(v => v.id.toString() === vehicleId);

  // On récupère la couleur de la marque et l'ID du tenant
  useEffect(() => {
    if (tenantSlug) {
      tenantService.getTenantSettings(tenantSlug).then(tenant => {
        if (tenant) {
          setTenantBrandColor(tenant.brand_color);
          setTenantId(tenant.id); // Set the tenant ID
        }
      });
    }
  }, [tenantSlug]);

  if (!vehicle) {
    // Affichez un message de chargement ou de véhicule non trouvé
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Véhicule non trouvé...</p>
      </div>
    );
  }

  // Don't render until we have the tenant data
  if (!tenantId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  // Votre composant de détail reçoit maintenant le véhicule directement !
  return (
    <VehicleDetailPage 
      vehicle={vehicle} 
      tenantSlug={tenantSlug}
      tenantId={tenantId}
      tenantBrandColor={tenantBrandColor}
    />
  );
}