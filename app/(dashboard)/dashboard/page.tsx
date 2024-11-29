import '@/app/styles/_dashboard.scss';
import { auth } from '@/auth';

export default async function page() {
  const session = await auth();

  return (
    <div className="rightside__content__body">
      <h1>Dashboard</h1>
    </div>
  );
}
