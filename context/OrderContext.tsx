'use client';

import { getOrders } from '@/lib/actions';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useMemo, useState } from 'react';
import { Order } from '@/lib/types';

export type OrderContextType = {
  isPending?: boolean;
  error: Error | null;
  filteredData: Order[];
  selectedOption: string;
  orderToEdit: Order | null;
  orders: Order[] | undefined;
  setSelectedOption: (option: string) => void;
  setOrderToEdit: (order: Order | null) => void;
};

export const OrderContext = createContext({} as OrderContextType);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedOption, setSelectedOption] = useState('All Orders');
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);

  const { isPending, error, data } = useQuery({
    queryKey: ['orders', selectedOption],
    queryFn: () => getOrders(),
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedOption === 'All Orders') return data;
    return data.filter((truck) => truck.status === selectedOption);
  }, [data, selectedOption]);

  return (
    <OrderContext.Provider
      value={{
        error,
        isPending,
        orderToEdit,
        orders: data,
        filteredData,
        selectedOption,
        setOrderToEdit,
        setSelectedOption,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
