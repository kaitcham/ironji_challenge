import '@/app/styles/_dashboard.scss';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="dashboard__container">
      <div className="dashboard__inner__container">
        <div className="dashboard__inner__container__sidebar">SideBar</div>
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
