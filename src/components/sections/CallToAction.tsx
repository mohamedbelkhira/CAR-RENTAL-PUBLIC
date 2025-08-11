
import Link from 'next/link';
import { TenantSettings } from '@/types/tenant.types';
import { Phone, MessageCircle } from 'lucide-react';

interface CallToActionProps {
  tenant: TenantSettings;
  tenantSlug: string;
}

export function CallToAction({ tenant, tenantSlug }: CallToActionProps) {
  const whatsappContact = tenant.contacts.find(contact => contact.type === 'whatsapp');
  
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Ready to Hit the Road?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Get in touch with us today and let us help you find the perfect vehicle for your journey.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={`/rental/${tenantSlug}/request`}
            className="px-8 py-4 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: tenant.brand_color }}
          >
            Request a Quote
          </Link>
          
          <a
            href={`tel:${tenant.phone}`}
            className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center justify-center space-x-2"
          >
            <Phone className="h-5 w-5" />
            <span>Call Now</span>
          </a>
          
          {whatsappContact && (
            <a
              href={`https://wa.me/${whatsappContact.value.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}