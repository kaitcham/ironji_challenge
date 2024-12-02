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
