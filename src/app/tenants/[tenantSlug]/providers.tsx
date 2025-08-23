'use client';

import { ReactNode } from 'react';
// Assurez-vous d'importer le Contexte que nous allons aussi créer
import { VehicleProvider } from '@/contexte/VehicleContext';
import { Vehicle } from '@/types/tenant.types'; // Assurez-vous que ce chemin est correct

interface ProvidersProps {
  children: ReactNode;
  vehicles: Vehicle[];
}


export function Providers({ children, vehicles }: ProvidersProps) {
  return (
    <VehicleProvider vehicles={vehicles}>
      {children}
    </VehicleProvider>
  );
}