'use client';

import MoreOption from '@/components/MoreOption';
import { useTrucks } from '@/app/context/TruckContext';
import TruckFormModel from '@/components/TruckFormModel';
import AllTrucksFilters from '@/components/Filters';
import '@/styles/_trucks.scss';

export default function page() {
  const { trucks } = useTrucks();
  const { initialData, selectedOption, SetSelectedOption } = useTrucks();
  const options = ['All Trucks', 'Available', 'Delivering', 'Maintenance'];

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
              <MoreOption />
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
