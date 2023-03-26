import { ReactNode } from 'react';

import Link from 'next/link';
import { IconType } from 'react-icons';

import { Button as ButtonChakra, ButtonProps as ButtonPropsChakra, Icon } from '@chakra-ui/react';

interface ButtonProps extends ButtonPropsChakra {
  children: ReactNode;
  icon?: IconType;
  bgColor?: string;
  iconSize?: number;
  hoverColorWeight?: string;
  href?: string;
}

export default function DSButton({
  children,
  icon,
  bgColor = 'pink.500',
  iconSize = 20,
  hoverColorWeight = '600',
  href = '',
  ...rest
}: ButtonProps) {
  const hoverColor = bgColor.substring(bgColor.indexOf('.'), 0);

  const buttonChakra = () => (
    <ButtonChakra
      bgColor={bgColor}
      _hover={{ bgColor: `${hoverColor}.${hoverColorWeight}` }}
      textColor="white"
      leftIcon={icon && <Icon as={icon} fontSize={iconSize} />}
      size={rest.size ?? 'sm'}
      boxShadow="lg"
      {...rest}
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
