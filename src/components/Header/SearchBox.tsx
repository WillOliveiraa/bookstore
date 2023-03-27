import { RiSearchLine } from 'react-icons/ri';

import { Flex, Input, useColorMode } from '@chakra-ui/react';

import DSIconButton from '../DSIconButton';

export function SearchBox() {
  const { colorMode } = useColorMode();

  const isDark = colorMode === 'dark';

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth="400"
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg={isDark ? 'gray.800' : 'gray.50'}
      borderRadius="full"
      boxShadow="lg"
    >
      <Input
        color={isDark ? 'gray.50' : 'gray.800'}
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na loja"
        _placeholder={{ color: 'gray.400' }}
      />

      <DSIconButton
        customIcon={RiSearchLine}
        aria-label="Search"
        onClick={() => {}}
        toltipLabel="Pesquisar"
      />
    </Flex>
  );
}
