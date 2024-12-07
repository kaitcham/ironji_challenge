'use client';
import Filters from '@/components/Filters';
import Loading from '@/components/Loading';
import { useDrivers } from '@/context/DriverContext';
import Error from '@/components/Error';
import AssignTruck from '@/components/AssignTruck';
import '@/styles/_trucks.scss';
import DeleteModel from '@/components/DeleteModel';

export default function page() {
  const options = ['All Drivers'];
  const {
    isPending,
    error,
    drivers,
    selectedOption,
    SetDriverToEdit,
    SetSelectedOption,
  } = useDrivers();

  if (isPending) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="rightside__content__body__header">
      <h1>Drivers</h1>
      <Filters
        name="Driver"
        options={options}
        initialData={drivers!}
        selectedOption={selectedOption}
        SetItemToEdit={() => {}}
        SetSelectedOption={SetSelectedOption}
      />
      <div className="overflow-auto mt-6 lg:max-w-4xl rounded-t-lg">
        <table className="w-full h-auto divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="[&>tr]:text-left">
            <tr>
              <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                License Number
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Contact Number
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Assigned Truck
              </th>
              <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {drivers?.map((driver) => (
              <tr key={driver.id}>
                <td className="whitespace-nowrap px-4 py-3 text-gray-900">
                  {driver.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {driver.license_number}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {driver.contact_number}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {driver.assigned_truck?.plate_number ?? (
                    <button
                      popoverTarget="assign-truck"
                      onClick={() => SetDriverToEdit(driver)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      + Truck
                    </button>
                  )}
                </td>
                <td className="flex items-center whitespace-nowrap px-4 py-3 text-gray-700">
                  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </button>
                  <DeleteModel driver={driver} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AssignTruck />
    </div>
  );
}
