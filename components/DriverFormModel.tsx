import { useForm } from 'react-hook-form';
import { DriverFormData, driverFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export default function DriverFormModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverFormSchema),
  });

  const handleSubmitForm = (data: DriverFormData) => {
    console.log(data);
  };

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
        <h3>Add New Driver</h3>
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
          <button type="submit">Add Driver</button>
        </form>
      </div>
    </dialog>
  );
}
