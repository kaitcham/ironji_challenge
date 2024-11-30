'use client';
import Link from 'next/link';
import Image from 'next/image';
import CarIcon from './Icons/CarIcon';
import { usePathname } from 'next/navigation';
import { HomeIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import '@/styles/_sidebar.scss';

export default function SideNavbar() {
  const pathname = usePathname();

  return (
    <div className="dashboard__inner__container__sidebar">
      <Link href="/dashboard" className="logo">
        <Image
          src="/logo.svg"
          alt="Company Logo"
          width={55}
          height={55}
          priority={true}
        />
      </Link>
      <ul className="links">
        <Link
          href="/dashboard"
          className={pathname === '/dashboard' ? 'active' : ''}
        >
          <HomeIcon width={32} height={32} />
          <span>Home</span>
        </Link>
        <Link
          href="/drivers"
          className={pathname === '/drivers' ? 'active' : ''}
        >
          <CarIcon isActive={pathname === '/drivers'} />
          <span>Drivers</span>
        </Link>
        <Link href="/orders" className={pathname === '/orders' ? 'active' : ''}>
          <ListBulletIcon width={32} height={32} />
          <span>Orders</span>
        </Link>
      </ul>
    </div>
  );
}
