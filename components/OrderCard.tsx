import { Order, OrderStatus } from '@/lib/types';
import MoreOption from './MoreOption';
import { useOrder } from '@/context/OrderContext';
import { MenuItem } from '@headlessui/react';
import { deleteOrder } from '@/lib/actions';
import { useCustomMutations } from '@/hooks/useCustomMutations';

export default function OrderCard({ order }: { order: Order }) {
  const { setOrderToEdit } = useOrder();
  const { updateOrderStatusMutation } = useCustomMutations();
  const {
    status,
    customer_name,
    customer_address,
    customer_contact,
    assigned_driver,
  } = order;

  const handleStatusChange = (id: string) => {
    const newStatus =
      status === OrderStatus.PENDING
        ? OrderStatus.DELIVERING
        : OrderStatus.COMPLETED;
    updateOrderStatusMutation.mutate({ id, status: newStatus });
  };

  const moreOptionName =
    status === OrderStatus.PENDING
      ? 'In Progress'
      : status === OrderStatus.DELIVERING
      ? 'Completed'
      : null;

  return (
    <div className="flex flex-col gap-2 p-3.5 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="px-4 py-0.5 text-sm text-[#000080A8] bg-[#0000FFAD]/30 font-semibold rounded-full">
          {status}
        </h3>
        <MoreOption
          id={order.id}
          name="Order"
          targetedForm="order-form"
          queryKey={['orders', 'All Orders']}
          handleEdit={() => setOrderToEdit(order)}
          handleDelete={deleteOrder}
        >
          {assigned_driver && status !== OrderStatus.COMPLETED && (
            <MenuItem
              as="button"
              className="item"
              onClick={() => handleStatusChange(order.id)}
            >
              {moreOptionName}
            </MenuItem>
          )}
        </MoreOption>
      </div>
      <div>
        <p className="text-base">Name: {customer_name}</p>
        <p className="text-base">Address: {customer_address}</p>
        <p className="text-base">Contact: {customer_contact}</p>
      </div>
      {assigned_driver ? (
        <div className="flex flex-col gap-2 md:flex-row md:gap-0">
          <div>
            <h3 className="text-base font-semibold">Assigned Driver</h3>
            <p className="text-base">Name: {assigned_driver.name}</p>
            <p className="text-base">
              Contact: {assigned_driver.contact_number}
            </p>
          </div>
          <div className="md:ml-auto">
            <h3 className="text-base font-semibold">Assigned Truck</h3>
            <p className="text-base">
              Capacity: {assigned_driver.assigned_truck.capacity}
            </p>
            <p className="text-base">
              Plate number: {assigned_driver.assigned_truck.plate_number}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p>To deliver this order, please assign a driver.</p>
          <button
            popoverTarget="assign-driver"
            onClick={() => setOrderToEdit(order)}
            className="px-4 py-2 text-white bg-[#2563EB] rounded-md"
          >
            Assign Driver
          </button>
        </div>
      )}
    </div>
  );
}
