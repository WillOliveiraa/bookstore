import { ElementType } from 'react';

import {
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  useColorMode
} from '@chakra-ui/react';

import TextView from '../Form/DSTextView';
import { ActiveLink } from './ActiveLink';

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  const { colorMode } = useColorMode();

  const isDark = colorMode === 'dark';

  return (
    <ActiveLink href={href} passHref isDark={isDark}>
      <ChakraLink
        as="div"
        display="flex"
        alignItems="center"
        {...rest}
        _hover={{ textDecor: 'none', color: 'gray.300' }}
      >
        <Icon as={icon} fontSize="20" />
        <TextView ml="4" fontWeight="semibold">
          {children}
        </TextView>
      </ChakraLink>
    </ActiveLink>
  );
}
