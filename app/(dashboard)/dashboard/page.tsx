'use client';

import Error from '@/components/Error';
import Filters from '@/components/Filters';
import Loading from '@/components/Loading';
import { deleteTruck } from '@/lib/actions';
import MoreOption from '@/components/MoreOption';
import TruckFormModel from '@/components/TruckFormModel';
import { useTrucks } from '@/context/TruckContext';
import TruckStateToggle from '@/components/TruckStateToggle';
import '@/styles/_trucks.scss';

export default function Page() {
  const options = ['All Trucks', 'Available', 'Delivering', 'Maintenance'];
  const {
    isPending,
    error,
    trucks,
    filteredData,
    selectedOption,
    SetTruckToEdit,
    SetSelectedOption,
  } = useTrucks();

  if (isPending) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="rightside__content__body">
      <div className="rightside__content__body__header">
        <h1>Dashboard</h1>
        <Filters
          name="Truck"
          target="truck"
          options={options}
          initialData={trucks!}
          selectedOption={selectedOption}
          SetSelectedOption={SetSelectedOption}
          SetItemToEdit={() => SetTruckToEdit(null)}
        />
      </div>
      <div className="trucks__container">
        {filteredData?.map((truck) => (
          <div key={truck.id} className="truck__card">
            <div className="truck__card__header">
              <span className={`${truck.status.toLowerCase()}`}>
                {truck.status}
              </span>
              <MoreOption
                id={truck.id}
                name="Truck"
                targetedForm="truck-form"
                queryKey={['trucks', selectedOption]}
                handleEdit={() => SetTruckToEdit(truck)}
                handleDelete={deleteTruck}
              />
            </div>
            <div className="truck__card__content">
              <p>Capacity: {truck.capacity}</p>
              <p>Plate Number: {truck.plate_number}</p>
            </div>
            <TruckStateToggle truck={truck} selectedOption={selectedOption} />
          </div>
        ))}
      </div>
      <TruckFormModel />
    </div>
  );
}
