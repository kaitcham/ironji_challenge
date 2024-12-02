'use server';

import { Truck, TruckStatus } from './types';

const API_URL = process.env.API_URL;

type FilterType = { query?: string };

export async function getTrucks({ query }: FilterType): Promise<Truck[]> {
  const response = await fetch(`${API_URL}/trucks?${query}`);
  return await response.json();
}

export async function createTruck(
  truck: Omit<Truck, 'status'>
): Promise<Truck> {
  const newTruck = { ...truck, status: TruckStatus.AVAILABLE };
  const response = await fetch(`${API_URL}/trucks`, {
    method: 'POST',
    body: JSON.stringify(newTruck),
  });
  return await response.json();
}
