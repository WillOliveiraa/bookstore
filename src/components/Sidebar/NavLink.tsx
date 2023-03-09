import { ElementType } from 'react';

import { Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from '@chakra-ui/react';

import { ActiveLink } from './ActiveLink';

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        as="div"
        display="flex"
        alignItems="center"
        {...rest}
        _hover={{ textDecor: 'none', color: 'gray.300' }}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="semibold">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
