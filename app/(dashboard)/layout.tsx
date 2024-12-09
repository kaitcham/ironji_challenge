import '@/styles/_dashboard.scss';
import TopNavbar from '@/components/TopNavbar';
import SideNavbar from '@/components/SideNavbar';
import ReactQueryProvider from '@/app/providers';
import { TruckProvider } from '@/context/TruckContext';
import { DriverProvider } from '@/context/DriverContext';
import { OrderProvider } from '@/context/OrderContext';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="dashboard__container">
      <div className="dashboard__inner__container">
        <SideNavbar />
        <div className="dashboard__inner__container__rightside">
          <TopNavbar />
          <div className="dashboard__inner__container__rightside__content">
            <ReactQueryProvider>
              <TruckProvider>
                <DriverProvider>
                  <OrderProvider>{children}</OrderProvider>
                </DriverProvider>
              </TruckProvider>
            </ReactQueryProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
