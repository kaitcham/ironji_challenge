import { toast } from 'sonner';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderFormData, orderFormSchema } from '@/lib/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useOrder } from '@/context/OrderContext';
import { createOrder, updateOrder } from '../lib/actions';

export default function OrderFormModel() {
  const queryClient = useQueryClient();
  const { orders, orderToEdit, selectedOption } = useOrder();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
  });

  const toastMessage = orderToEdit
    ? 'Order updated successfully'
    : 'Order added successfully';

  const orderMutation = useMutation({
    mutationFn: (data: OrderFormData) =>
      orderToEdit
        ? updateOrder(orderToEdit!.id, data)
        : createOrder({ id: String(orders!.length + 1), ...data }),
    onSuccess: () => {
      toast.success(toastMessage);
      document.getElementById('order-form')?.hidePopover();
      queryClient.invalidateQueries({ queryKey: ['orders', selectedOption] });
    },
    onError: (error) => {
      return toast.error(error.message);
    },
  });

  const handleFormSubmit = (data: OrderFormData) => {
    orderMutation.mutate(data);
  };

  useEffect(() => {
    setValue('customer_name', orderToEdit?.customer_name || '');
    setValue('customer_address', orderToEdit?.customer_address || '');
    setValue('customer_contact', orderToEdit?.customer_contact || '');
  }, [orderToEdit, setValue]);

  return (
    <dialog id="order-form" popover="auto" className="popover-form">
      <button
        className="icon"
        popoverTarget="order-form"
        popoverTargetAction="hide"
      >
        ❌
      </button>
      <div className="content">
        <h3>{orderToEdit ? 'Edit Order ' : 'Add Order'}</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input placeholder="Full name" {...register('customer_name')} />
            {errors.customer_name && (
              <span className="text-xs text-red-500 ">
                {errors.customer_name.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="address">Address:</label>
            <input placeholder="Address" {...register('customer_address')} />
            {errors.customer_address && (
              <span className="text-xs text-red-500 ">
                {errors.customer_address.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              placeholder="Contact number"
              {...register('customer_contact')}
            />
            {errors.customer_contact && (
              <span className="text-xs text-red-500 ">
                {errors.customer_contact.message}
              </span>
            )}
          </div>
          <button type="submit">
            {orderToEdit ? 'Update Order' : 'Add Order'}
          </button>
        </form>
      </div>
    </dialog>
  );
}
