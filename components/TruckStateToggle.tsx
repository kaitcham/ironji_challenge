import { toast } from 'sonner';
import { Truck, TruckStatus } from '@/lib/types';
import { updateTruck } from '@/lib/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import '@/styles/_trucks.scss';

export default function TruckStateToggle({
  truck,
  selectedOption,
}: {
  truck: Truck;
  selectedOption: string;
}) {
  const queryClient = useQueryClient();
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TruckStatus }) =>
      updateTruck(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trucks', selectedOption] });
      return toast.success('Status updated successfully');
    },
    onError: (error: Error) => {
      return toast.error(error.message);
    },
  });

  const handleChange = (id: string, newStatus: TruckStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const statusOptions = {
    [TruckStatus.AVAILABLE]: [
      {
        label: 'Delivering',
        action: () => handleChange(truck.id, TruckStatus.DELIVERING),
      },
      {
        label: 'Maintenance',
        action: () => handleChange(truck.id, TruckStatus.MAINTENANCE),
      },
    ],
    [TruckStatus.DELIVERING]: [
      {
        label: 'Delivering',
        action: () => handleChange(truck.id, TruckStatus.AVAILABLE),
      },
    ],
    [TruckStatus.MAINTENANCE]: [
      {
        label: 'Maintenance',
        action: () => handleChange(truck.id, TruckStatus.AVAILABLE),
      },
    ],
  };

  return (
    <div className="flex justify-between items-center">
      {statusOptions[truck.status]?.map(({ label, action }) => (
        <div key={label} className="truck__card__footer">
          <input
            name="status"
            type="checkbox"
            onChange={action}
            disabled={updateStatusMutation.isPending}
            checked={truck.status !== TruckStatus.AVAILABLE}
            className={
              truck.status === TruckStatus.MAINTENANCE
                ? 'accent-red-500/50'
                : ''
            }
          />
          <label htmlFor="status">{label}</label>
        </div>
      ))}
    </div>
  );
}
