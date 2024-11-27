import Link from 'next/link';
import Image from 'next/image';
import ToggleTheme from './ToggleTheme';
import '@/app/styles/_navbar.scss';

export default function Navbar() {
  return (
    <header className="header__container">
      <nav className="header__container__navbar">
        <Link href="/" className="logo">
          <Image src="/logo.svg" alt="Company Logo" width={35} height={35} />
        </Link>

        <div className="right__section">
          <ToggleTheme sunIcon="sun__btn" moonIcon="moon__btn" />
          <Link href="/login" className="login__btn">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
