import { IconType } from 'react-icons';

import { Icon, IconButton as IconButtonChakra, useColorMode } from '@chakra-ui/react';

interface IconButtonProps {
  arialLabel: string;
  icon: IconType;
  onClick: (e: any) => void;
}

export default function IconButton({ arialLabel, icon, onClick }: IconButtonProps) {
  const { colorMode } = useColorMode();

  return (
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
  );
}
