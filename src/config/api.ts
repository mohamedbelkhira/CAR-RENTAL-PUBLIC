
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  TIMEOUT: 10000, // 10 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
} as const;

export const API_ENDPOINTS = {
  TENANT: {
    GET_SETTINGS: (slug: string) => `/tenants/${slug}/settings`,
    GET_BASIC: (slug: string) => `/tenants/${slug}/basic`,
    GET_VEHICLES: (slug: string) => `/tenant/${slug}/vehicles`, // Future endpoint
    GET_AVAILABILITY: (slug: string) => `/tenant/${slug}/availability`, // Future endpoint
    CREATE_BOOKING: (slug: string) => `/tenant/${slug}/bookings`, // Future endpoint
  },
} as const;