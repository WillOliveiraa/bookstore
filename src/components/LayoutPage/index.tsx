import { ReactNode } from 'react';

import { Flex, useColorMode } from '@chakra-ui/react';

import ForceAuthentication from '../ForceAuthentication';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

interface LayoutProps {
  children: ReactNode;
}

function LayoutPage({ children }: LayoutProps) {
  const { colorMode } = useColorMode();

  const isDark = colorMode === 'dark';

  return (
    <ForceAuthentication>
      <Flex direction="column" h="100vh" bg={isDark ? 'gray.900' : ''}>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          {children}
        </Flex>
      </Flex>
    </ForceAuthentication>
  );
}

export default LayoutPage;
