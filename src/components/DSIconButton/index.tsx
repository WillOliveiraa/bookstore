import { IconType } from 'react-icons';

import { Icon, IconButton, IconButtonProps, Tooltip, useColorMode } from '@chakra-ui/react';

interface DSIconButtonProps extends IconButtonProps {
  customIcon: IconType;
  toltipLabel?: string;
}

export default function DSIconButton({ customIcon, toltipLabel, ...rest }: DSIconButtonProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Tooltip hasArrow label={toltipLabel} bg={isDark ? 'gray.700' : 'gray.200'} color="white">
      <IconButton
        borderRadius="20"
        fontSize="20"
        variant="ghost"
        _hover={{
          bgColor: colorMode === 'dark' ? 'gray.700' : 'gray.50',
          color: colorMode === 'dark' ? 'gray.200' : 'gray.400'
        }}
        icon={<Icon as={customIcon} />}
        {...rest}
      />
    </Tooltip>
  );
}
