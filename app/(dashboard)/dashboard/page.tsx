'use client';

import AllTrucksFilters from '@/components/AllTrucksFilters';
import TruckFormModel from '@/components/TruckFormModel';
import '@/styles/_trucks.scss';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import { getTrucks } from '../../../lib/actions';

export default function page() {
  const {
    isPending,
    isError,
    data: trucks,
    error,
  } = useQuery({
    queryKey: ['trucks'],
    queryFn: () => getTrucks({ query: 'hjjjh' }),
  });

  if (isPending) return <Loading />;
  if (isError) return <span>Errors: {error.message}</span>;

  return (
    <div className="rightside__content__body">
      <div className="rightside__content__body__header">
        <h1>Dashboard</h1>
        <AllTrucksFilters />
      </div>
      <div className="trucks__container">
        {trucks?.map((truck) => (
          <div key={truck.id} className="truck__card">
            <div className="truck__card__header">
              <span>{truck.status}</span>
              <EllipsisVerticalIcon width={25} height={24} />
            </div>
            <div className="truck__card__content">
              <p>Capacity: {truck.capacity}</p>
              <p>Plate Number: {truck.plate_number}</p>
            </div>
            <div className="truck__card__footer">
              <input type="checkbox" />
              <label htmlFor="">Mark as available</label>
            </div>
          </div>
        ))}
      </div>
      <TruckFormModel />
    </div>
  );
}
