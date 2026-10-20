'use client';
import { Outfit } from 'next/font/google';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { store, persistor  } from '@/store/store'
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <link rel="manifest" href="/manifest.json"/>
      <link rel="icon" type="image/png" sizes="192x192" href="/icon512_maskable.png"/>
      <meta name="theme-color" content="#f2f2f2"></meta>
      <body className="dark:bg-gray-900">
        <Provider store={store}>          
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
