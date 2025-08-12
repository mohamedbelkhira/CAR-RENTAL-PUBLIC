
import { tenantService } from '@/services/tenant.service';
import { ContactInfo } from '@/components/common/ContactInfo';


interface ContactPageProps {
  params: { tenantSlug: string };
}

export default async function ContactPage({ params }: ContactPageProps) {
  try {
    const tenant = await tenantService.getTenantSettings(params.tenantSlug);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Contact {tenant.name}
          </h1>
          <p className="text-gray-600">
            Get in touch with us for any questions or requests
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo tenant={tenant} />
         {/* <ContactForm tenantSlug={params.tenantSlug} /> */} 
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Unable to Load Contact Information
        </h1>
        <p className="text-gray-600">
          Please try again later.
        </p>
      </div>
    );
  }
}