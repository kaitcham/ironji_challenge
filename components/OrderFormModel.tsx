import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderFormData, orderFormSchema } from '@/lib/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useOrder } from '@/context/OrderContext';
import { createOrder } from '../lib/actions';

export default function OrderFormModel() {
  const queryClient = useQueryClient();
  const { orders, selectedOption } = useOrder();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
  });

  const orderMutation = useMutation({
    mutationFn: (data: OrderFormData) =>
      createOrder({ id: String(orders!.length + 1), ...data }),
    onSuccess: () => {
      toast.success('Order added successfully');
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
        <h3>Add Order</h3>
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
          <button type="submit">Add Order</button>
        </form>
      </div>
    </dialog>
  );
}
