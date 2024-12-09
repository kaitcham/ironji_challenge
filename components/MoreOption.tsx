import { Fragment } from 'react';
import DeleteModel from './DeleteModel';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import {
  Menu,
  MenuItem,
  MenuItems,
  MenuButton,
  Transition,
} from '@headlessui/react';

interface MoreOptionProps {
  id: string;
  name: string;
  queryKey: string[];
  targetedForm: string;
  handleEdit: () => void;
  children?: React.ReactNode;
  handleDelete: (id: string) => Promise<void>;
}

export default function MoreOption({
  id,
  name,
  queryKey,
  children,
  handleEdit,
  targetedForm,
  handleDelete,
}: MoreOptionProps) {
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
            <MenuItem
              as="button"
              className="item"
              onClick={handleEdit}
              popoverTarget={targetedForm}
            >
              Edit
            </MenuItem>
          </div>
          <hr />
          <div>
            <MenuItem>
              <DeleteModel
                itemId={id}
                name={name}
                className="item"
                queryKey={queryKey}
                deleteItem={handleDelete}
              />
            </MenuItem>
          </div>
          {children && <hr />}
          {children}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
