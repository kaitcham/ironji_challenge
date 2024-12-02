import { Fragment } from 'react';
import {
  Menu,
  MenuItem,
  MenuItems,
  MenuButton,
  Transition,
} from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTruck } from '@/lib/actions';
import { toast } from 'sonner';

interface MoreOptionProps {
  id: string;
  queryKey: string[];
  handleEdit: () => void;
}

export default function MoreOption({
  id,
  queryKey,
  handleEdit,
}: MoreOptionProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTruck(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      return toast.success('Truck deleted successfully');
    },
    onError: (error: Error) => {
      return toast.error(error.message);
    },
  });

  return (
    <Menu as="div" className="more__options">
      <MenuButton className="more__options__btn">
        <EllipsisVerticalIcon width={25} height={24} />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="more__options__container">
          <div>
            <MenuItem as="button" className="item">
              Edit
            </MenuItem>
          </div>
          <hr />
          <div>
            <MenuItem
              as="button"
              className="item"
              onClick={() => deleteMutation.mutate(id)}
            >
              Delete
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
