import { ReactNode } from 'react';

import { Box, Stack, useColorMode } from '@chakra-ui/react';

import TextView from '../TextView';

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  const { colorMode } = useColorMode();

  const isDark = colorMode === 'dark';

  return (
    <Box>
      <TextView fontWeight="bold" color={isDark ? 'gray.400' : 'gray.700'} fontSize="medium">
        {title}
      </TextView>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
