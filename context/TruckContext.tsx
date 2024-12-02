'use client';
import { Truck } from '@/lib/types';
import { getTrucks } from '@/lib/actions';
import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Loading';

export type TruckContextType = {
  initialData: Truck[];
  selectedOption: string;
  trucks: Truck[] | undefined;
  refetch?: () => void;
  SetSelectedOption: (option: string) => void;
};

export const TruckContext = createContext<TruckContextType>(
  {} as TruckContextType
);

export const TruckProvider = ({ children }: { children: React.ReactNode }) => {
  const [initialData, SetInitialData] = useState<Truck[]>([]);
  const [selectedOption, SetSelectedOption] = useState('All Trucks');
  const query =
    selectedOption === 'All Trucks' ? '' : `status=${selectedOption}`;

  const {
    isPending,
    isError,
    data: trucks,
    error,
    refetch,
  } = useQuery({
    queryKey: ['trucks', selectedOption],
    queryFn: () => getTrucks({ query }),
  });

  useEffect(() => {
    if (trucks && initialData.length === 0) SetInitialData([...trucks]);
    else return;
  }, [trucks]);

  if (isPending) return <Loading />;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <TruckContext.Provider
      value={{
        initialData,
        trucks,
        selectedOption,
        SetSelectedOption,
        refetch,
      }}
    >
      {children}
    </TruckContext.Provider>
  );
};

export const useTrucks = () => useContext(TruckContext);
