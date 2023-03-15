import type { AppProps } from 'next/app';

import { EditCategoryProvider } from '@/context/categories/EditCategoryContext';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { SidebarDrawerProvider } from '../context/SidebarDrawerContext';
import '../lib/dayjs';
import { queryClient } from '../lib/react-query';
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <EditCategoryProvider>
            <Component {...pageProps} />
          </EditCategoryProvider>
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
