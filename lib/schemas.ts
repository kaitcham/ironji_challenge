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

export type TruckFormData = z.infer<typeof truckFormSchema>;
