
import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api';
import { ApiResponse} from '@/types/api.types';

import { 
  TenantSettings, 
  TenantBasic, 
  Vehicle,
  VehicleImage
} from '@/types/tenant.types';

export const tenantService = {
  /**
   * Get full tenant settings and configuration
   */
  async getTenantSettings(slug: string): Promise<TenantSettings> {
    const response = await apiClient.get<ApiResponse<TenantSettings>>(
      API_ENDPOINTS.TENANT.GET_SETTINGS(slug)
    );
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch tenant settings');
    }
    
    return response.data;
  },

  /**
   * Get basic tenant information (lightweight)
   */
  async getTenantBasic(slug: string): Promise<TenantBasic> {
    const response = await apiClient.get<ApiResponse<TenantBasic>>(
      API_ENDPOINTS.TENANT.GET_BASIC(slug)
    );
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch tenant basic info');
    }
    
    return response.data;
  },

  async getTenantVehicles(slug: string): Promise<Vehicle[]> {
    const response = await apiClient.get<ApiResponse<Vehicle[]>>(
      API_ENDPOINTS.TENANT.GET_VEHICLES(slug)
    );
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch tenant vehicles');
    }
    
    return response.data;
  },
};
