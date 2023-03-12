import type { AppProps } from 'next/app';

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
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
