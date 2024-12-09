'use server';

import { Driver, Order, OrderStatus, Truck, TruckStatus } from './types';

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

export async function getDrivers(query?: FilterType): Promise<Driver[]> {
  const response = await fetch(`${API_URL}/drivers?${query}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch drivers: ${errorText}`);
  }

  return await response.json();
}

export async function assignTruck(
  driverId: string,
  truck: Truck
): Promise<void> {
  const response = await fetch(`${API_URL}/drivers/${driverId}`, {
    method: 'PATCH',
    body: JSON.stringify({ assigned_truck: truck }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to assign truck: ${errorText}`);
  }
}

export async function createDriver(driver: Omit<Driver, 'assigned_truck'>) {
  const newDriver = { ...driver, assigned_truck: null };
  const response = await fetch(`${API_URL}/drivers`, {
    method: 'POST',
    body: JSON.stringify(newDriver),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create driver: ${errorText}`);
  }

  return await response.json();
}

export async function updateDriver(
  id: string,
  changes: Partial<Omit<Driver, 'id'>>
): Promise<Driver> {
  const response = await fetch(`${API_URL}/drivers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ ...changes }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update driver: ${errorText}`);
  }

  return await response.json();
}

export async function deleteDriver(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/drivers/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete driver: ${errorText}`);
  }
}

export async function getOrders(query?: FilterType): Promise<Order[]> {
  const response = await fetch(`${API_URL}/orders?${query}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch orders: ${errorText}`);
  }

  return await response.json();
}

export async function assignOrder(
  orderId: string,
  driver: Driver
): Promise<void> {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: 'PATCH',
    body: JSON.stringify({ assigned_driver: driver }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to assign order: ${errorText}`);
  }
}

export async function createOrder(
  order: Omit<Order, 'status' | 'assigned_driver'>
): Promise<Order> {
  const newOrder = { ...order, status: OrderStatus.PENDING };
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create order: ${errorText}`);
  }

  return await response.json();
}

export async function updateOrder(
  id: string,
  changes: Partial<Omit<Order, 'id'>>
): Promise<Order> {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ ...changes }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update order: ${errorText}`);
  }

  return await response.json();
}

export async function deleteOrder(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete order: ${errorText}`);
  }
}
