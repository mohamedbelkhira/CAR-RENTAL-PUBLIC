
import Link from 'next/link';
import Image from 'next/image';
import { TenantBasic } from '@/types/tenant.types';
import { Phone, Mail } from 'lucide-react';

interface TenantNavigationProps {
  tenant: TenantBasic;
  tenantSlug: string;
}

export function TenantNavigation({ tenant, tenantSlug }: TenantNavigationProps) {
  const navLinks = [
    { href: `/rental/${tenantSlug}`, label: 'Home' },
    { href: `/rental/${tenantSlug}/vehicles`, label: 'Vehicles' },
    { href: `/rental/${tenantSlug}/contact`, label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo and brand */}
          <Link href={`/rental/${tenantSlug}`} className="flex items-center space-x-3">
            {tenant.profile_image && (
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={tenant.profile_image}
                  alt={`${tenant.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold" style={{ color: tenant.brand_color }}>
                {tenant.name}
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                {tenant.description}
              </p>
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/rental/${tenantSlug}/request`}
              className="px-6 py-2 rounded-lg text-white font-medium transition-colors"
              style={{ backgroundColor: tenant.brand_color }}
            >
              Get Quote
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}