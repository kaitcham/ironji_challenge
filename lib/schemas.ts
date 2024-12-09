import { z } from 'zod';

export const truckFormSchema = z.object({
  capacity: z
    .number()
    .min(1, 'Capacity is required')
    .positive('Capacity must be a positive number'),
  plate_number: z
    .string()
    .min(1, 'Plate number is required')
    .max(6, 'Plate number must be 6 characters')
    .regex(/^[A-Z]{3}[0-9]{3}$/, 'Invalid plate number format Eg. ABC123'),
});

export const driverFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  license_number: z.string().min(1, 'License number is required'),
  contact_number: z.string().min(1, 'Contact number is required'),
});

export const orderFormSchema = z.object({
  customer_name: z.string().min(1, 'Name is required'),
  customer_address: z.string().min(1, 'Address is required'),
  customer_contact: z.string().min(1, 'Contact number is required'),
});

export type TruckFormData = z.infer<typeof truckFormSchema>;
export type OrderFormData = z.infer<typeof orderFormSchema>;
export type DriverFormData = z.infer<typeof driverFormSchema>;
