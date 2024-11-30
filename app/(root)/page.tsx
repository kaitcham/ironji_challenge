import Link from 'next/link';
import Image from 'next/image';
import '@/styles/_landing.scss';

export default function Home() {
  return (
    <section className="landing__container">
      <div className="landing__container__info">
        <h1>
          <span>Trucking Logistics</span> <br /> Management System
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          nam fugiat, expedita fuga beatae magnam, labore molestiae assumenda
          quod deleniti repellat excepturi! Atque rerum eligendi iste expedita.
        </p>
        <Link href="/login" className="hero__btn">
          Login/Register
        </Link>
      </div>
      <div className="landing__container__hero__img">
        <Image
          src="https://assets-global.website-files.com/660a742bdcbe8e8216996048/660a742bdcbe8e8216996152_car%20(2).png"
          alt="Hero Image"
          width={500}
          height={500}
          quality={100}
        />
      </div>
    </section>
  );
}
