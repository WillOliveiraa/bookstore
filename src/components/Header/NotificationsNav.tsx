import { RiLogoutBoxLine, RiNotificationLine, RiUserAddLine } from 'react-icons/ri';

import { HStack, Icon, IconButton } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';

export function NotificationsNav() {
  const { logout } = useAuth();

  return (
    <HStack
      spacing={['6', '8']}
      mx={['6', '8']}
      pr={['6', '8']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Icon as={RiNotificationLine} fontSize="20" />
      <Icon as={RiUserAddLine} fontSize="20" />
      <IconButton
        icon={<Icon as={RiLogoutBoxLine} />}
        fontSize="20"
        aria-label="Logout"
        variant="ghost"
        _hover={{ bgColor: 'gray.800' }}
        onClick={logout}
      />
    </HStack>
  );
}
