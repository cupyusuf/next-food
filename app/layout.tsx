"use client";

import "./globals.css";
import HomeLayout from './layouts/HomeLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        {pathname.startsWith('/dashboard') ? (
          <DashboardLayout>{children}</DashboardLayout>
        ) : (
          <HomeLayout>{children}</HomeLayout>
        )}
      </body>
    </html>
  );
}
