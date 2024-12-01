export enum TruckStatus {
  AVAILABLE = 'Available',
  DELIVERING = 'Delivering',
  MAINTENANCE = 'Maintenance',
}

export interface Truck {
  id: number;
  capacity: number;
  status: TruckStatus;
  plate_number: string;
}
