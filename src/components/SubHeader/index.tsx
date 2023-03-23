import { ReactNode } from 'react';

import { Box, Flex, Heading, useColorMode } from '@chakra-ui/react';

interface SubHeaderProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function SubHeader({ title, children, actions }: SubHeaderProps) {
  const { colorMode } = useColorMode();

  const isDark = colorMode === 'dark';

  return (
    <Box flex="1" borderRadius={8} bg={isDark ? 'gray.800' : 'gray.50'} p="8">
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
