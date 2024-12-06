'use client';

import { useTrucks } from '@/context/TruckContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useDrivers } from '../context/DriverContext';

export default function AssignTruck() {
  const { trucks } = useTrucks();
  const { driverToEdit } = useDrivers();
  const [selectedTruck, setSelectedTruck] = useState<string>('');
  const availableTrucks = trucks?.filter((t) => t.status === 'Available');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const truck = availableTrucks?.find((truck) => truck.id === selectedTruck);
    if (!truck) return;
    console.log(driverToEdit?.id, truck);
  };

  return (
    <div id="assign-truck" popover="auto" className="popover-form">
      <button
        className="icon"
        popoverTarget="assign-truck"
        popoverTargetAction="hide"
      >
        ❌
      </button>
      <div className="content">
        <h3>Assign Truck</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="truck">Truck:</label>
            <div className="relative">
              <select
                id="truck"
                name="truck"
                value={selectedTruck}
                className="appearance-none"
                onChange={(e) => setSelectedTruck(e.target.value)}
              >
                <option value="">Select Truck</option>
                {availableTrucks?.map((truck) => (
                  <option key={truck.id} value={truck.id}>
                    {truck.plate_number}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>
          <button>Assign Truck</button>
        </form>
      </div>
    </div>
  );
}
