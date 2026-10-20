'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'next-themes'; // if you're using next-themes
import { store, persistor } from '@/store/store'; // adjust path

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
