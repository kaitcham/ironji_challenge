export enum TruckStatus {
  AVAILABLE = 'Available',
  DELIVERING = 'Delivering',
  MAINTENANCE = 'Maintenance',
}

export enum OrderStatus {
  PENDING = 'Pending',
  DELIVERING = 'In Progress',
  COMPLETED = 'Completed',
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

export interface DriverWithTruck extends Driver {
  assigned_truck: Truck;
}

export interface Order {
  id: string;
  status: OrderStatus;
  customer_name: string;
  customer_address: string;
  customer_contact: string;
  assigned_driver?: DriverWithTruck;
}
