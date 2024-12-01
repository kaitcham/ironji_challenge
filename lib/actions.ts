'use server';

import { Truck } from './types';

const API_URL = process.env.API_URL;

type FilterType = { query?: string };

export async function getTrucks({ query }: FilterType): Promise<Truck[]> {
  const response = await fetch(`${API_URL}/trucks?${query}`);
  return await response.json();
}
