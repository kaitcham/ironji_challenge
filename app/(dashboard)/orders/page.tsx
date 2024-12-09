'use client';
import Filters from '@/components/Filters';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import OrderCard from '@/components/OrderCard';
import { useOrder } from '@/context/OrderContext';

export default function page() {
  const options = ['All Orders', 'Pending', 'In Progress', 'Completed'];
  const {
    isPending,
    orders,
    error,
    filteredData,
    selectedOption,
    setSelectedOption,
  } = useOrder();

  if (isPending) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="rightside__content__body">
      <div className="rightside__content__body__header">
        <h1>Orders</h1>
        <Filters
          name="Order"
          target="order"
          options={options}
          initialData={orders!}
          selectedOption={selectedOption}
          SetSelectedOption={setSelectedOption}
          SetItemToEdit={() => {}}
        />
      </div>
      <div className="grid gap-8 px-2 py-3 md:px-5 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
        {filteredData.map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
