import { IconType } from 'react-icons';

import { Icon, IconButton as IconButtonChakra, Tooltip, useColorMode } from '@chakra-ui/react';

interface IconButtonProps {
  arialLabel: string;
  icon: IconType;
  onClick: (e: any) => void;
  toltipLabel?: string;
}

export default function IconButton({ arialLabel, icon, onClick, toltipLabel }: IconButtonProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Tooltip hasArrow label={toltipLabel} bg={isDark ? 'gray.700' : 'gray.200'} color="white">
      <IconButtonChakra
        borderRadius="20"
        fontSize="20"
        variant="ghost"
        aria-label={arialLabel}
        _hover={{
          bgColor: colorMode === 'dark' ? 'gray.700' : 'gray.50',
          color: colorMode === 'dark' ? 'gray.200' : 'gray.400'
        }}
        icon={<Icon as={icon} />}
        onClick={onClick}
      />
    </Tooltip>
  );
}
