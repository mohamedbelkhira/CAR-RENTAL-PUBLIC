// src/types/api.types.ts

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  error: string;
  message: string;
}

// src/types/tenant.types.ts

export interface Contact {
  type: 'whatsapp' | 'facebook' | 'phone' | 'fax' | 'mobile' | 'email' | 'website' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube' | 'other';
  value: string;
  label: string;
}

export interface OperatingHours {
  is_work_day: boolean;
  start_time: string; // Format: "HH:MM"
  end_time: string;   // Format: "HH:MM"
}

export interface TenantOperatingHours {
  Dimanche: OperatingHours;
  Lundi: OperatingHours;
  Mardi: OperatingHours;
  Mercredi: OperatingHours;
  Jeudi: OperatingHours;
  Vendredi: OperatingHours;
  Samedi: OperatingHours;
}

export interface TenantSettings {
  id: number;
  slug: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  contacts: Contact[];
  profile_image: string | null;
  banner_image: string | null;
  brand_color: string;
  is_active: boolean;
  operating_hours: TenantOperatingHours;
  public_url: string;
  created_at: string;
  updated_at: string;
}

export interface TenantBasic {
  id: number;
  slug: string;
  name: string;
  description: string;
  brand_color: string;
  profile_image: string | null;
  is_active: boolean;
}