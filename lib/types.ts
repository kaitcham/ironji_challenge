export enum TruckStatus {
  AVAILABLE = 'Available',
  DELIVERING = 'Delivering',
  MAINTENANCE = 'Maintenance',
}

export interface Truck {
  id: string;
  capacity: number;
  status: TruckStatus;
  plate_number: string;
}

export interface Driver {
  id: string;
  name: string;
  license_number: string;
  contact_number: string;
  assigned_truck?: Truck;
}
