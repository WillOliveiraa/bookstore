import { Box, HStack, Stack } from '@chakra-ui/react';

import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  currentPage?: number;
  maxItemPage?: number;
  totalPage?: number;
}

export function Pagination({ currentPage = 0, maxItemPage = 10, totalPage = 50 }: PaginationProps) {
  return (
    <Stack direction={['column', 'row']} mt="6" spacing="6" justify="space-between" align="center">
      <Box>
        <strong>{currentPage}</strong> - <strong>{maxItemPage}</strong> de
        <strong> {totalPage}</strong>
      </Box>
      <HStack spacing="2">
        <PaginationItem number={1} isCurrent />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
        <PaginationItem number={4} />
      </HStack>
    </Stack>
  );
}
