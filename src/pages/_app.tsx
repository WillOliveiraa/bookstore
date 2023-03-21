import type { AppProps } from 'next/app';

import { AuthProvider } from '@/contexts/AuthContext';
import { EditCategoryProvider } from '@/contexts/categories/EditCategoryContext';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import '../lib/dayjs';
import { queryClient } from '../lib/react-query';
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <SidebarDrawerProvider>
            <EditCategoryProvider>
              <Component {...pageProps} />
            </EditCategoryProvider>
          </SidebarDrawerProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
