'use client';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';

export default function ToggleTheme({
  sunIcon,
  moonIcon,
}: Readonly<{ moonIcon: string; sunIcon: string }>) {
  const { isDarkMode, setDarkMode } = useTheme();

  const handleClicked = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <button className={isDarkMode ? sunIcon : moonIcon} onClick={handleClicked}>
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
