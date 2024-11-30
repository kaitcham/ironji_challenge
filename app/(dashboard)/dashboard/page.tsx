import { auth } from '@/auth';
import AllTrucksFilters from '@/components/AllTrucksFilters';

export default async function page() {
  const session = await auth();

  return (
    <div className="rightside__content__body">
      <h1>Dashboard</h1>
      <AllTrucksFilters />
    </div>
  );
}
