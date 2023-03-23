import { Button, useColorMode } from '@chakra-ui/react';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
}

export function PaginationItem({ isCurrent = false, number }: PaginationItemProps) {
  const { colorMode } = useColorMode();

  const isDark = colorMode === 'dark';

  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        // colorScheme="pink"
        bgColor="pink.500"
        _hover={{ bgColor: 'pink.700' }}
        textColor={'white'}
        disabled
        _disabled={{ bgColor: 'pink.500', cursor: 'default' }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg={isDark ? 'gray.700' : 'gray.100'}
      _hover={{ bgColor: isDark ? 'gray.500' : 'gray.200' }}
    >
      {number}
    </Button>
  );
}
