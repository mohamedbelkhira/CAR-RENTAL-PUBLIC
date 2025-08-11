
import { TenantBasic } from '@/types/tenant.types';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface TenantFooterProps {
  tenant: TenantBasic;
}

export function TenantFooter({ tenant }: TenantFooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{tenant.name}</h3>
            <p className="text-gray-300 mb-4">{tenant.description}</p>
            <div className="flex items-center space-x-2 text-gray-300">
              <span>Trusted car rental service</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#vehicles" className="hover:text-white transition-colors">
                  Our Fleet
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Visit us for the best car rental experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>Call us for immediate assistance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>Email us your requirements</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <span>Open 7 days a week</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {tenant.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}