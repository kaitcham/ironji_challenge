'use client';
import { Truck } from '@/lib/types';
import { getTrucks } from '@/lib/actions';
import { createContext, useContext, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export type TruckContextType = {
  isPending?: boolean;
  error: Error | null;
  filteredData: Truck[];
  selectedOption: string;
  trucks: Truck[] | undefined;
  SetSelectedOption: (option: string) => void;
};

export const TruckContext = createContext<TruckContextType>(
  {} as TruckContextType
);

export const TruckProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedOption, SetSelectedOption] = useState('All Trucks');

  const { isPending, error, data } = useQuery({
    queryKey: ['trucks', selectedOption],
    queryFn: () => getTrucks(),
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedOption === 'All Trucks') return data;
    return data.filter((truck) => truck.status === selectedOption);
  }, [data, selectedOption]);

  return (
    <TruckContext.Provider
      value={{
        isPending,
        error,
        trucks: data,
        filteredData,
        selectedOption,
        SetSelectedOption,
      }}
    >
      {children}
    </TruckContext.Provider>
  );
};

export const useTrucks = () => useContext(TruckContext);
