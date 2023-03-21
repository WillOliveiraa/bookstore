import { ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';

import ForceAuthentication from '../ForceAuthentication';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

interface LayoutProps {
  children: ReactNode;
}

function LayoutPage({ children }: LayoutProps) {
  return (
    <ForceAuthentication>
      <Flex direction="column" h="100vh">
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
