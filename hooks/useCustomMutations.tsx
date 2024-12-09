import { toast } from 'sonner';
import { useOrder } from '@/context/OrderContext';
import { OrderStatus, TruckStatus } from '@/lib/types';
import { updateOrder, updateTruck } from '@/lib/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTrucks } from '@/context/TruckContext';

export const useCustomMutations = () => {
  const queryClient = useQueryClient();
  const { selectedOption: orderSelectedOption } = useOrder();
  const { selectedOption: truckSelectedOption } = useTrucks();

  const updateTruckStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TruckStatus }) =>
      updateTruck(id, { status }),
    onSuccess: () => {
      toast.success('Status updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['trucks', truckSelectedOption],
      });
    },
    onError: (error: Error) => {
      return toast.error(error.message);
    },
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateOrder(id, { status }),
    onSuccess: (data) => {
      const { status, assigned_driver } = data;
      const newTruckStatus =
        status === OrderStatus.DELIVERING
          ? TruckStatus.DELIVERING
          : TruckStatus.AVAILABLE;

      updateTruckStatusMutation.mutate({
        id: assigned_driver!.assigned_truck.id,
        status: newTruckStatus,
      });

      toast.success('Status updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['orders', orderSelectedOption],
      });
    },
    onError: (error: Error) => {
      return toast.error(error.message);
    },
  });

  return { updateTruckStatusMutation, updateOrderStatusMutation };
};
