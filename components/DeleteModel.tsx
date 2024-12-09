import { toast } from 'sonner';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteModelProps {
  name: string;
  itemId: string;
  queryKey: string[];
  className?: string;
  deleteItem: (id: string) => Promise<void>;
}

export default function DeleteModel({
  name,
  itemId,
  queryKey,
  className,
  deleteItem,
}: DeleteModelProps) {
  const queryClient = useQueryClient();
  const modelRef = useRef<HTMLDialogElement>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess: () => {
      modelRef.current?.close();
      queryClient.invalidateQueries({ queryKey });
      toast.success(`${name} deleted successfully`);
    },
    onError: (error) => {
      return toast.error(error.message);
    },
  });

  return (
    <>
      <button
        onClick={() => modelRef.current?.showModal()}
        className={className}
      >
        Delete
      </button>
      <dialog ref={modelRef} className="popover-form">
        <button className="icon" onClick={() => modelRef.current?.close()}>
          ❌
        </button>
        <div>
          <h3 className="text-lg text-gray-800 pt-5 pb-2">
            {`Are you sure you want to delete this ${name.toLowerCase()}?`}
          </h3>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => modelRef.current?.close()}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteMutation.mutate(itemId)}
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
