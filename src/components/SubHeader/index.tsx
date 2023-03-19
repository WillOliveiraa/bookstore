import { ReactNode } from 'react';

import { Box, Flex, Heading } from '@chakra-ui/react';

interface SubHeaderProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function SubHeader({ title, children, actions }: SubHeaderProps) {
  return (
    <Box flex="1" borderRadius={8} bg="gray.800" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="bold">
          {title}
        </Heading>

        {actions}
      </Flex>
      <Box as="main">{children}</Box>
    </Box>
  );
}
