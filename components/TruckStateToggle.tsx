import '@/styles/_trucks.scss';
import { Truck, TruckStatus } from '@/lib/types';
import { useCustomMutations } from '@/hooks/useCustomMutations';

export default function TruckStateToggle({
  truck,
  selectedOption,
}: {
  truck: Truck;
  selectedOption: string;
}) {
  const { updateTruckStatusMutation } = useCustomMutations();

  const handleChange = (id: string, newStatus: TruckStatus) => {
    updateTruckStatusMutation.mutate({ id, status: newStatus });
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
            disabled={updateTruckStatusMutation.isPending}
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
