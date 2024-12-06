'use client';
import { getDrivers } from '@/lib/actions';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useMemo, useState } from 'react';
import { Driver } from '@/lib/types';

export interface DriveContextType {
  isPending: boolean;
  error: Error | null;
  selectedOption: string;
  driverToEdit: Driver | null;
  drivers: Driver[] | undefined;
  SetSelectedOption: (option: string) => void;
  SetDriverToEdit: (driver: Driver | null) => void;
}

export const DriverContext = createContext({} as DriveContextType);

export const DriverProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedOption, SetSelectedOption] = useState('All Drivers');
  const [driverToEdit, SetDriverToEdit] = useState<Driver | null>(null);

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
        driverToEdit,
        selectedOption,
        SetDriverToEdit,
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
