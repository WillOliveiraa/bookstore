import { ReactNode } from 'react';

import Link from 'next/link';
import { IconType } from 'react-icons';

import { Button as ButtonChakra, Icon } from '@chakra-ui/react';

interface ButtonProps {
  children: ReactNode;
  icon?: IconType;
  bgColor?: string;
  iconSize?: number;
  hoverColorWeight?: string;
  onClick?: (e: any) => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  size?: string;
}

export default function DSButton({
  children,
  icon,
  bgColor = 'pink.500',
  iconSize = 20,
  onClick,
  hoverColorWeight = '700',
  href = '',
  type = 'button',
  isLoading = false,
  size = 'sm'
}: ButtonProps) {
  const hoverColor = bgColor.substring(bgColor.indexOf('.'), 0);

  const buttonChakra = () => (
    <ButtonChakra
      size={size}
      fontSize={size}
      bgColor={bgColor}
      _hover={{ bgColor: `${hoverColor}.${hoverColorWeight}` }}
      textColor="white"
      leftIcon={icon && <Icon as={icon} fontSize={iconSize} />}
      onClick={onClick}
      type={type}
      isLoading={isLoading}
    >
      {children}
    </ButtonChakra>
  );

  if (!href) return buttonChakra();

  return (
    <Link href={href} passHref>
      {buttonChakra()}
    </Link>
  );
}
