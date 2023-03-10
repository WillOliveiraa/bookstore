import { ReactNode } from 'react';

import { Box, Flex, Heading } from '@chakra-ui/react';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

interface SubHeaderProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function SubHeader({ title, children, actions }: SubHeaderProps) {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="bold">
              {title}
            </Heading>

            {actions}
          </Flex>
          <Box as="main">{children}</Box>
        </Box>
      </Flex>
    </Box>
  );
}
