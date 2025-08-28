
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://srv673142.hstgr.cloud/api',
  TIMEOUT: 100000, 
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
} as const;

export const API_ENDPOINTS = {
  TENANT: {
    GET_SETTINGS: (slug: string) => `/tenants/${slug}/settings`,
    GET_BASIC: (slug: string) => `/tenants/${slug}/basic`,
    GET_VEHICLES: (slug: string) => `/tenants/${slug}/vehicles`, 
   GET_VEHICLES_AVAILABILITY: (slug: string) => `/tenants/${slug}/vehicles/availability`,
 
   
  },
} as const;