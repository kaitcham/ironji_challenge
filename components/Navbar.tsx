'use client';
import Link from 'next/link';
import Image from 'next/image';
import ToggleTheme from './ToggleTheme';
import { usePathname } from 'next/navigation';
import '@/styles/_navbar.scss';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="header__container">
      <nav className="header__container__navbar">
        <Link href="/" className="logo">
          <Image
            src="/logo.svg"
            alt="Company Logo"
            width={35}
            height={35}
            priority={true}
          />
        </Link>

        <div className="right__section">
          <ToggleTheme sunIcon="sun__btn" moonIcon="moon__btn" />
          {pathname !== '/login' && (
            <Link href="/login" className="login__btn">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
