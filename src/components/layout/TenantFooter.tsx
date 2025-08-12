// src/components/layout/TenantFooter.tsx

import { TenantSettings } from '@/types/tenant.types';

interface TenantFooterProps {
  tenant: TenantSettings;
}

export function TenantFooter({ tenant }: TenantFooterProps) {
  // Simple footer or no footer for single page
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 text-sm">
          © 2024 {tenant.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}