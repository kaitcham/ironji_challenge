'use client';
import { getDrivers } from '@/lib/actions';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useMemo, useState } from 'react';
import { Driver } from '@/lib/types';

export interface DriveContextType {
  isPending: boolean;
  error: Error | null;
  selectedOption: string;
  drivers: Driver[] | undefined;
  SetSelectedOption: (option: string) => void;
}

export const DriverContext = createContext({} as DriveContextType);

export const DriverProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedOption, SetSelectedOption] = useState('All Drivers');

  const { isPending, data, error } = useQuery({
    queryKey: ['drivers', selectedOption],
    queryFn: () => getDrivers(),
  });

  return (
    <DriverContext.Provider
      value={{
        isPending,
        error,
        drivers: data,
        selectedOption,
        SetSelectedOption,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export const useDrivers = () => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error('useDrivers must be used within a DriveProvider');
  }
  return context;
};
