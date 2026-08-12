export interface MedicalDevice {
  id: number;

  device_test: string | null;
  manufacturer: string | null;
  approval_clearance_year: string | null;
  regulatory_body: string | null;
  country_region: string | null;
  device_type: string | null;
  primary_use: string | null;
  nafld_masld: string | null;
  nash_mash: string | null;
  fibrosis: string | null;
  cirrhosis: string | null;
}

export interface MedicalDeviceListResponse {
  items: MedicalDevice[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}