'use client';

import { useState } from 'react';
import { truckFormSchema } from '@/lib/schemas';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { createTruck } from '@/lib/actions';
import { useTrucks } from '@/context/TruckContext';

export default function TruckFormModel() {
  const queryClient = new QueryClient();
  const { initialData, selectedOption, refetch } = useTrucks();
  const [errors, SetErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    capacity: 0,
    plate_number: '',
  });

  const createMutation = useMutation({
    mutationFn: createTruck,
    onSuccess: () => {
      setFormData({ capacity: 0, plate_number: '' });
      queryClient.invalidateQueries({ queryKey: ['trucks', selectedOption] });
      document.getElementById('truck-form')?.hidePopover();
      refetch?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { capacity, plate_number } = formData;
      const validated = truckFormSchema.parse({ capacity, plate_number });
      const newTruck = { ...validated, id: initialData.length + 1 };
      console.log(newTruck);
      createMutation.mutate(newTruck);
    } catch (error: any) {
      SetErrors(error.formErrors.fieldErrors);
    }
  };

  return (
    <dialog id="truck-form" popover="auto">
      <button
        className="icon"
        popoverTarget="truck-form"
        popoverTargetAction="hide"
      >
        ❌
      </button>
      <div className="content">
        <h3>Add New Truck</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="capacity">Capacity:</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.valueAsNumber })
              }
            />
            {errors.capacity && <span>{errors.capacity[0]}</span>}
          </div>

          <div>
            <label htmlFor="plateNumber">Plate Number:</label>
            <input
              type="text"
              name="plateNumber"
              value={formData.plate_number}
              onChange={(e) =>
                setFormData({ ...formData, plate_number: e.target.value })
              }
            />
            {errors.plate_number && <span>{errors.plate_number[0]}</span>}
          </div>
          <button type="submit">Add Truck</button>
        </form>
      </div>
    </dialog>
  );
}
