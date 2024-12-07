import { useForm } from 'react-hook-form';
import { DriverFormData, driverFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDriver, updateDriver } from '@/lib/actions';
import { toast } from 'sonner';
import { useDrivers } from '../context/DriverContext';
import { useEffect } from 'react';

export default function DriverFormModel() {
  const queryClient = useQueryClient();
  const { drivers, driverToEdit, selectedOption } = useDrivers();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverFormSchema),
  });

  const toastMessage = driverToEdit
    ? 'Driver updated successfully'
    : 'Driver added successfully';

  const driverMutation = useMutation({
    mutationFn: (data: DriverFormData) =>
      driverToEdit
        ? updateDriver(driverToEdit!.id, data)
        : createDriver({ id: String(drivers!.length + 1), ...data }),
    onSuccess: () => {
      toast.success(toastMessage);
      document.getElementById('driver-form')?.hidePopover();
      queryClient.invalidateQueries({ queryKey: ['drivers', selectedOption] });
    },
    onError: (error) => {
      return toast.error(error.message);
    },
  });

  const handleSubmitForm = (data: DriverFormData) => {
    driverMutation.mutate(data);
  };

  // Initialize form values with driverToEdit data
  useEffect(() => {
    setValue('name', driverToEdit?.name || '');
    setValue('license_number', driverToEdit?.license_number || '');
    setValue('contact_number', driverToEdit?.contact_number || '');
  }, [driverToEdit, setValue]);

  return (
    <dialog id="driver-form" popover="auto" className="popover-form">
      <button
        className="icon"
        popoverTarget="driver-form"
        popoverTargetAction="hide"
      >
        ❌
      </button>
      <div className="content">
        <h3>{driverToEdit ? 'Edit Driver' : 'Add Driver'}</h3>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input {...register('name')} placeholder="Full name" />
            {errors.name && (
              <span className="text-xs text-red-500 ">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="licenseNumber">License Number:</label>
            <input
              placeholder="License number"
              {...register('license_number')}
            />
            {errors.license_number && (
              <span className="text-xs text-red-500 ">
                {errors.license_number.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              placeholder="Contact number"
              {...register('contact_number')}
            />
            {errors.contact_number && (
              <span className="text-xs text-red-500 ">
                {errors.contact_number.message}
              </span>
            )}
          </div>
          <button type="submit">
            {driverToEdit ? 'Update Driver' : 'Add Driver'}
          </button>
        </form>
      </div>
    </dialog>
  );
}
