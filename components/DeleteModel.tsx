import { useRef } from 'react';
import { Driver } from '@/lib/types';
import { deleteDriver } from '../lib/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDrivers } from '../context/DriverContext';
import { toast } from 'sonner';

export default function DeleteModel({ driver }: { driver: Driver }) {
  const queryClient = useQueryClient();
  const { selectedOption } = useDrivers();
  const modelRef = useRef<HTMLDialogElement>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDriver(id),
    onSuccess: () => {
      modelRef.current?.close();
      toast.success('Driver deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['drivers', selectedOption] });
    },
    onError: (error) => {
      return toast.error(error.message);
    },
  });

  return (
    <>
      <button
        onClick={() => modelRef.current?.showModal()}
        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-4"
      >
        Remove
      </button>
      <dialog ref={modelRef} className="popover-form">
        <button className="icon" onClick={() => modelRef.current?.close()}>
          ❌
        </button>
        <div>
          <h3 className="text-lg text-gray-800 pt-5 pb-2">
            Are you sure you want to delete this driver?
          </h3>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => modelRef.current?.close()}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteMutation.mutate(driver.id)}
              className="px-4 py-2 bg-red-500 text-white ms-4"
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
