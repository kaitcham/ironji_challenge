'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import MoreOption from '@/components/MoreOption';
import { useTrucks } from '@/context/TruckContext';
import TruckFormModel from '@/components/TruckFormModel';
import AllTrucksFilters from '@/components/Filters';
import { Truck, TruckStatus } from '@/lib/types';
import { updateTruckStatus } from '@/lib/actions';
import '@/styles/_trucks.scss';

export default function Page() {
  const { trucks } = useTrucks();
  const queryClient = useQueryClient();
  const { initialData, selectedOption, SetSelectedOption } = useTrucks();
  const options = ['All Trucks', 'Available', 'Delivering', 'Maintenance'];

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TruckStatus }) =>
      updateTruckStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trucks', selectedOption] });
    },
    onError: (error: Error) => {
      console.error('Failed to update truck status:', error);
    },
  });

  const handleChangeStatus = (truck: Truck) => {
    const { id } = truck;

    if (truck) {
      const newStatus =
        truck.status === TruckStatus.AVAILABLE
          ? TruckStatus.DELIVERING
          : TruckStatus.AVAILABLE;
      updateStatusMutation.mutate({ id, status: newStatus });
    }
  };

  return (
    <div className="rightside__content__body">
      <div className="rightside__content__body__header">
        <h1>Dashboard</h1>
        <AllTrucksFilters
          name="Truck"
          initialData={initialData}
          options={options}
          selectedOption={selectedOption}
          SetSelectedOption={SetSelectedOption}
        />
      </div>
      <div className="trucks__container">
        {trucks?.map((truck) => (
          <div key={truck.id} className="truck__card">
            <div className="truck__card__header">
              <span className={`${truck.status.toLowerCase()}`}>
                {truck.status}
              </span>
              <MoreOption
                id={truck.id}
                queryKey={['trucks', selectedOption]}
                handleEdit={() => {}}
              />
            </div>
            <div className="truck__card__content">
              <p>Capacity: {truck.capacity}</p>
              <p>Plate Number: {truck.plate_number}</p>
            </div>
            <div className="truck__card__footer">
              {truck.status !== TruckStatus.MAINTENANCE && (
                <>
                  <input
                    name="status"
                    type="checkbox"
                    onChange={() => handleChangeStatus(truck)}
                    checked={truck.status === TruckStatus.DELIVERING}
                    disabled={updateStatusMutation.isPending}
                  />
                  <label htmlFor="status">
                    {truck.status === TruckStatus.DELIVERING
                      ? 'Delivering'
                      : 'Available'}
                  </label>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <TruckFormModel />
    </div>
  );
}
