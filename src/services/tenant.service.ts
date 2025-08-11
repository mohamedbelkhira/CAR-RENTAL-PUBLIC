
import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api';
import { 
  ApiResponse, 
  TenantSettings, 
  TenantBasic, 
  Vehicle,
  RentalRequest,
  RentalRequestResponse 
} from '@/types';

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

  /**
   * Get tenant vehicles (Future endpoint)
   */
  async getTenantVehicles(slug: string): Promise<Vehicle[]> {
    try {
      const response = await apiClient.get<ApiResponse<Vehicle[]>>(
        API_ENDPOINTS.TENANT.GET_VEHICLES(slug)
      );
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch vehicles');
      }
      
      return response.data;
    } catch (error) {
      // Return mock data for now since endpoint doesn't exist yet
      console.warn('Vehicles endpoint not implemented yet, returning mock data');
      return [];
    }
  },

  /**
   * Submit rental request (Future endpoint)
   */
  async submitRentalRequest(slug: string, request: RentalRequest): Promise<RentalRequestResponse> {
    try {
      const response = await apiClient.post<RentalRequestResponse>(
        API_ENDPOINTS.TENANT.CREATE_BOOKING(slug),
        request
      );
      
      return response;
    } catch (error) {
      // Mock response for now since endpoint doesn't exist yet
      console.warn('Booking endpoint not implemented yet, returning mock response');
      return {
        success: true,
        message: 'Request submitted successfully (mock response)',
        request_id: Math.floor(Math.random() * 1000)
      };
    }
  },
};