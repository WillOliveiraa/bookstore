import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';

import { SidebarDrawerProvider } from '../context/SidebarDrawerContext';
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}
