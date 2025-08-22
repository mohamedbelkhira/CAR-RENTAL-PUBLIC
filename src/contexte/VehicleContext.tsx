'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Vehicle } from '@/types/tenant.types'; 
const VehicleContext = createContext<Vehicle[]>([]);


export function VehicleProvider({ children, vehicles }: { children: ReactNode; vehicles: Vehicle[] }) {
  return (
    <VehicleContext.Provider value={vehicles}>
      {children}
    </VehicleContext.Provider>
  );
}


export function useVehicles() {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
}