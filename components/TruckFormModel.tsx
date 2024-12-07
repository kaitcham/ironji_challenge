'use client';

import { useEffect } from 'react';
import { TruckFormData, truckFormSchema } from '@/lib/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTruck, updateTruck } from '@/lib/actions';
import { useTrucks } from '@/context/TruckContext';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function TruckFormModel() {
  const queryClient = useQueryClient();
  const { trucks, truckToEdit, selectedOption } = useTrucks();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TruckFormData>({
    resolver: zodResolver(truckFormSchema),
  });

  const toastMessage = !truckToEdit
    ? 'Truck added successfully'
    : 'Truck updated successfully';

  const truckMutation = useMutation({
    mutationFn: (data: TruckFormData) =>
      truckToEdit
        ? updateTruck(truckToEdit!.id, data)
        : createTruck({ id: String(trucks!.length + 1), ...data }),
    onSuccess: () => {
      toast.success(toastMessage);
      document.getElementById('truck-form')?.hidePopover();
      queryClient.invalidateQueries({ queryKey: ['trucks', selectedOption] });
    },
    onError: (error) => {
      return toast.error(error.message);
    },
  });

  const handleSubmitForm = (data: TruckFormData) => {
    truckMutation.mutate(data);
  };

  useEffect(() => {
    setValue('capacity', truckToEdit?.capacity || 0);
    setValue('plate_number', truckToEdit?.plate_number || '');
  }, [truckToEdit, setValue]);

  return (
    <dialog id="truck-form" popover="auto" className="popover-form">
      <button
        className="icon"
        popoverTarget="truck-form"
        popoverTargetAction="hide"
      >
        ❌
      </button>
      <div className="content">
        <h3>{truckToEdit ? 'Edit Truck' : 'Add Truck'}</h3>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div>
            <label htmlFor="capacity">Capacity:</label>
            <input
              type="number"
              {...register('capacity', { valueAsNumber: true })}
            />
            {errors.capacity && (
              <span className="text-xs text-red-500">
                {errors.capacity.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="plate_number">Plate Number:</label>
            <input type="text" {...register('plate_number')} />
            {errors.plate_number && (
              <span className="text-xs text-red-500">
                {errors.plate_number.message}
              </span>
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
