'use client';
import { useState } from 'react';
import Filters from '@/components/Filters';
import { useQuery } from '@tanstack/react-query';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import OrderCard from '@/components/OrderCard';

export default function page() {
  const [selectedOption, SetSelectedOption] = useState('All Orders');
  const options = ['All Orders', 'Pending', 'In Progress', 'Completed'];

  const {
    isPending,
    data: orders,
    error,
  } = useQuery({
    queryKey: ['orders', selectedOption],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/orders`);
      return await response.json();
    },
  });

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
          initialData={orders}
          selectedOption={selectedOption}
          SetSelectedOption={SetSelectedOption}
          SetItemToEdit={() => {}}
        />
      </div>
      <div className="grid gap-8 px-2 py-3 md:px-5 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
        {orders.map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
