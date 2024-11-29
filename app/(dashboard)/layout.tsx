import '@/app/styles/_dashboard.scss';
import SideNavbar from '@/components/SideNavbar';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="dashboard__container">
      <div className="dashboard__inner__container">
        <SideNavbar />
        <div className="dashboard__inner__container__rightside">
          <div className="dashboard__inner__container__rightside__content">
            <div className="dashboard__inner__container__rightside__content__topbar">
              TopBar
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
