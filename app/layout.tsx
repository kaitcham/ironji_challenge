import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './styles/globals.scss';
import { ThemeProvider } from './context/ThemeContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Ironji',
  description: 'Trucking Logistics Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
