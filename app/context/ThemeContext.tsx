'use client';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

export type ThemeContextType = {
  isDarkMode: boolean;
  setDarkMode: (isDarkMode: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext<ThemeContextType | null>(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
