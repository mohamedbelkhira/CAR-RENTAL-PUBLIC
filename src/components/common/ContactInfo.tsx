
import { TenantSettings, Contact } from '@/types/tenant.types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  ExternalLink
} from 'lucide-react';

interface ContactInfoProps {
  tenant: TenantSettings;
}

const getContactIcon = (type: Contact['type']) => {
  const iconMap = {
    phone: Phone,
    mobile: Phone,
    whatsapp: MessageCircle,
    email: Mail,
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    website: Globe,
    fax: Phone,
    linkedin: ExternalLink,
    tiktok: ExternalLink,
    youtube: ExternalLink,
    other: ExternalLink,
  };
  
  return iconMap[type] || ExternalLink;
};

const formatContactValue = (contact: Contact) => {
  switch (contact.type) {
    case 'email':
      return `mailto:${contact.value}`;
    case 'phone':
    case 'mobile':
    case 'whatsapp':
      return `tel:${contact.value}`;
    case 'website':
      return contact.value.startsWith('http') ? contact.value : `https://${contact.value}`;
    case 'facebook':
      return `https://facebook.com/${contact.value}`;
    case 'instagram':
      return `https://instagram.com/${contact.value}`;
    case 'twitter':
      return `https://twitter.com/${contact.value}`;
    case 'linkedin':
      return `https://linkedin.com/company/${contact.value}`;
    default:
      return contact.value;
  }
};

export function ContactInfo({ tenant }: ContactInfoProps) {
  const workingDays = Object.entries(tenant.operating_hours)
    .filter(([_, hours]) => hours.is_work_day)
    .map(([day]) => day);

  return (
    <div className="space-y-8">
      {/* Basic Contact Information */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
        
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Address</h3>
              <p className="text-gray-600">{tenant.address}</p>
            </div>
          </div>

          {/* Primary Phone */}
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Phone</h3>
              <a 
                href={`tel:${tenant.phone}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {tenant.phone}
              </a>
            </div>
          </div>

          {/* Primary Email */}
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <a 
                href={`mailto:${tenant.email}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {tenant.email}
              </a>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Operating Hours</h3>
              <div className="text-gray-600">
                {workingDays.length > 0 ? (
                  <p>Open {workingDays.length} days a week</p>
                ) : (
                  <p>Contact us for operating hours</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Contacts */}
      {tenant.contacts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Connect With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tenant.contacts.map((contact, index) => {
              const Icon = getContactIcon(contact.type);
              const href = formatContactValue(contact);
              
              return (
                <a
                  key={index}
                  href={href}
                  target={contact.type !== 'phone' && contact.type !== 'email' ? '_blank' : undefined}
                  rel={contact.type !== 'phone' && contact.type !== 'email' ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{contact.label}</h4>
                    <p className="text-sm text-gray-600">{contact.value}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}