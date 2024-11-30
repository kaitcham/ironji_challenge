import Navbar from '@/components/Navbar';
import '@/styles/_root.scss';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="root__container">
      <Navbar />
      {children}
    </div>
  );
}
