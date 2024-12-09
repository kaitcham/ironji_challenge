'use client';
import { toast } from 'sonner';
import { useState } from 'react';
import { Driver, TruckStatus } from '@/lib/types';
import { assignOrder } from '@/lib/actions';
import { useOrder } from '@/context/OrderContext';
import { useDrivers } from '@/context/DriverContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AssignDriver() {
  const { drivers } = useDrivers();
  const { orderToEdit, selectedOption } = useOrder();
  const queryClient = useQueryClient();
  const [selectedDriver, setSelectedDriver] = useState<string>('');
  const availableDrivers = drivers?.filter(
    (driver) => driver.assigned_truck?.status === TruckStatus.AVAILABLE
  );

  const assignDriverMutation = useMutation({
    mutationFn: ({ orderId, driver }: { orderId: string; driver: Driver }) =>
      assignOrder(orderId, driver),
    onSuccess: () => {
      setSelectedDriver('');
      toast.success('Driver assigned successfully');
      document.getElementById('assign-driver')?.hidePopover();
      queryClient.invalidateQueries({ queryKey: ['orders', selectedOption] });
    },
    onError: (error) => {
      return toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const driver = availableDrivers?.find((d) => d.id === selectedDriver);
    if (!driver) return;
    assignDriverMutation.mutate({ orderId: orderToEdit!.id, driver });
  };

  return (
    <div id="assign-driver" popover="auto" className="popover-form">
      <button
        className="icon"
        popoverTarget="assign-driver"
        popoverTargetAction="hide"
      >
        ❌
      </button>
      <div className="content">
        <h3>Assign Driver</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="driver">Driver:</label>
            <div className="relative">
              <select
                id="driver"
                name="driver"
                value={selectedDriver}
                className="appearance-none"
                onChange={(e) => setSelectedDriver(e.target.value)}
              >
                <option value="">Select Driver</option>
                {availableDrivers?.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>
          <button>Assign Driver</button>
        </form>
      </div>
    </div>
  );
}
