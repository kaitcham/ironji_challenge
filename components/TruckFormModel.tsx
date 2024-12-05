'use client';

import { useEffect, useState } from 'react';
import { truckFormSchema } from '@/lib/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTruck, updateTruck } from '@/lib/actions';
import { useTrucks } from '@/context/TruckContext';
import { toast } from 'sonner';
import { Truck } from '@/lib/types';

export default function TruckFormModel() {
  const queryClient = useQueryClient();
  const { trucks, truckToEdit, selectedOption } = useTrucks();
  const [errors, SetErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ capacity: 0, plate_number: '' });

  const truckMutation = useMutation({
    mutationFn: ({
      id,
      newTruck,
    }: {
      id: string;
      newTruck: Omit<Truck, 'id' | 'status'>;
    }) => {
      return !truckToEdit
        ? createTruck({ id, ...newTruck })
        : updateTruck(id, newTruck);
    },
    onSuccess: () => {
      setFormData({ capacity: 0, plate_number: '' });
      document.getElementById('truck-form')?.hidePopover();
      toast.success('Truck added successfully');
      queryClient.invalidateQueries({ queryKey: ['trucks', selectedOption] });
    },
    onError: (error: Error) => {
      return toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { capacity, plate_number } = formData;
      const validated = truckFormSchema.parse({ capacity, plate_number });
      truckMutation.mutate({
        id: truckToEdit?.id || String(trucks!.length + 1),
        newTruck: validated,
      });
    } catch (error: any) {
      SetErrors(error.formErrors.fieldErrors);
    }
  };

  useEffect(() => {
    SetErrors({});
    setFormData({
      capacity: truckToEdit?.capacity || 0,
      plate_number: truckToEdit?.plate_number || '',
    });
  }, [truckToEdit]);

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
            {errors.capacity && (
              <span className="text-red-500">{errors.capacity[0]}</span>
            )}
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
            {errors.plate_number && (
              <span className="text-red-500">{errors.plate_number[0]}</span>
            )}
          </div>
          <button type="submit">
            {truckToEdit ? 'Update Truck' : 'Add Truck'}
          </button>
        </form>
      </div>
    </dialog>
  );
}
