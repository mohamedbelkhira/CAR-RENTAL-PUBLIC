export interface ReservationFormProps {
  tenantBrandColor: string;
  dailyRate: number;
  vehicleId: number;
  tenantId: number;
  baseUrl?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data?: {
    booking: {
      id: number;
      reference: string;
      status: string;
      requested_dates: {
        start: string;
        end: string;
      };
      vehicle: {
        make: string;
        model: string;
        year: number;
      };
      customer: {
        name: string;
        phone: string;
      };
    };
  };
  errors?: Record<string, string[]>;
}