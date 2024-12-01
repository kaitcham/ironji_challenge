import '@/styles/_dashboard.scss';
import TopNavbar from '@/components/TopNavbar';
import SideNavbar from '@/components/SideNavbar';
import ReactQueryProvider from '@/app/providers';
import { TruckProvider } from '../context/TruckContext';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="dashboard__container">
      <div className="dashboard__inner__container">
        <SideNavbar />
        <div className="dashboard__inner__container__rightside">
          <div className="dashboard__inner__container__rightside__content">
            <TopNavbar />
            <ReactQueryProvider>
              <TruckProvider>{children}</TruckProvider>
            </ReactQueryProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
