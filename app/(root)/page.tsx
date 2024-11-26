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
      <div className={styles.hero__info}>
        <div className="info">
          <h1>
            <span>Trucking Logistics</span> <br /> Management System
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit nam fugiat, expedita fuga beatae magnam, labore
            molestiae assumenda quod deleniti repellat excepturi! Atque rerum
            eligendi iste expedita.
          </p>
          <Link href="/login" className={styles.hero__btn}>
            Login/Register
          </Link>
        </div>
        <div className={styles.hero__image}>
          <Image
            src="https://assets-global.website-files.com/660a742bdcbe8e8216996048/660a742bdcbe8e8216996152_car%20(2).png"
            alt="Hero Image"
            width={500}
            height={500}
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}
