'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CloseButton, Disclosure, DisclosureButton } from '@headlessui/react';

export default function MobileNavbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <Disclosure>
      <DisclosureButton
        className="open__menu"
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        {openMenu ? (
          <XMarkIcon width={25} height={25} />
        ) : (
          <Bars3Icon width={25} height={25} />
        )}
      </DisclosureButton>
      <div className="mobile__menu__container">
        <div>
          <CloseButton
            as={Link}
            href="/dashboard"
            className={pathname === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </CloseButton>
          <CloseButton
            as={Link}
            href="/drivers"
            className={pathname === '/drivers' ? 'active' : ''}
          >
            Drivers
          </CloseButton>
          <CloseButton
            as={Link}
            href="/orders"
            className={pathname === '/orders' ? 'active' : ''}
          >
            Orders
          </CloseButton>
        </div>
      </div>
    </Disclosure>
  );
}
