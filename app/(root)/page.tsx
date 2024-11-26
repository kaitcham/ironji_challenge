import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import ToggleTheme from '../components/ToggleTheme';

export default function Home() {
  return (
    <section className={styles.container}>
      <header>
        <nav>
          <Link href="/" className={styles.logo}>
            <Image src="/logo.svg" alt="Company Logo" width={35} height={35} />
          </Link>

          <div>
            <ToggleTheme
              sunIcon={styles.sun__btn}
              moonIcon={styles.moon__btn}
            />
            <Link href="/login" className={styles.login__btn}>
              Login
            </Link>
          </div>
        </nav>
      </header>
    </section>
  );
}
