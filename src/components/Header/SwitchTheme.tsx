import { useState } from 'react';

import { RiMoonFill, RiSunLine } from 'react-icons/ri';

import { Box, FormLabel, Icon, Input, useColorMode } from '@chakra-ui/react';

export default function SwitchTheme() {
  const { setColorMode } = useColorMode();
  const [theme, setTheme] = useState('light');
  const isLight = theme.includes('light');

  async function toggleColorMode(value: string) {
    setTheme(value);
    await new Promise((resolve) => setTimeout(resolve, 200));
    setColorMode(value);
  }

  return (
    <FormLabel
      htmlFor="theme-switcher"
      as="label"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      position="relative"
      mt="2"
    >
      <Input
        id="theme-switcher"
        type="checkbox"
        checked={isLight ? true : false}
        onChange={() => toggleColorMode(isLight ? 'dark' : 'light')}
        display="inline-block"
        appearance="none"
        cursor="pointer"
        height="24px"
        width="48px"
        backgroundColor={isLight ? 'gray.100' : 'gray.700'}
        border="1px solid"
        borderColor={isLight ? 'gray.100' : 'gray.500'}
        borderRadius="full"
        _hover={{ color: isLight ? 'gray.100' : 'gray.500' }}
      />
      <Box
        className={`iconMove `}
        transition="all 0.2s ease-in"
        transform={`${isLight ? 'translateX(0)' : 'translateX(24px)'}`}
        position="absolute"
        cursor="pointer"
        top="1px"
        left="1px"
        w="22px"
        h="22px"
        bg={isLight ? 'white' : 'gray.500'}
        borderRadius="full"
      >
        <Icon as={isLight ? RiSunLine : RiMoonFill} padding="2px" color="icon" w="22px" h="22px" />
      </Box>
    </FormLabel>
  );
}
