'use client';

import { getOrders } from '@/lib/actions';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useMemo, useState } from 'react';
import { Order } from '@/lib/types';

export type OrderContextType = {
  isPending?: boolean;
  error: Error | null;
  filteredData: Order[];
  orders: Order[] | undefined;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
};

export const OrderContext = createContext({} as OrderContextType);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedOption, setSelectedOption] = useState('All Orders');
  const { isPending, error, data } = useQuery({
    queryKey: ['trucks', selectedOption],
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
        orders: data,
        filteredData,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
