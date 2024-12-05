'use server';

import { Truck, TruckStatus } from './types';

const API_URL = process.env.API_URL || 'http://localhost:3001';

type FilterType = { query: string };

export async function getTrucks(query?: FilterType): Promise<Truck[]> {
  const response = await fetch(`${API_URL}/trucks?${query}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch trucks: ${errorText}`);
  }

  return await response.json();
}

export async function createTruck(
  truck: Omit<Truck, 'status'>
): Promise<Truck> {
  const newTruck = { ...truck, status: TruckStatus.AVAILABLE };
  const response = await fetch(`${API_URL}/trucks`, {
    method: 'POST',
    body: JSON.stringify(newTruck),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create truck: ${errorText}`);
  }

  return await response.json();
}

export async function updateTruck(
  id: string,
  changes: Partial<Omit<Truck, 'id'>>
): Promise<Truck> {
  const response = await fetch(`${API_URL}/trucks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ ...changes }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update truck status: ${errorText}`);
  }

  return await response.json();
}

export async function deleteTruck(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/trucks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete truck: ${errorText}`);
  }
}
