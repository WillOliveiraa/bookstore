import { RiLogoutBoxLine, RiNotificationLine, RiUserAddLine } from 'react-icons/ri';

import { HStack } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';
import DSIconButton from '../DSIconButton';

export function NotificationsNav() {
  const { logout } = useAuth();

  return (
    <HStack
      spacing={'4'}
      mx={['4', '6']}
      pr={['4', '6']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <DSIconButton
        aria-label="Notification"
        customIcon={RiNotificationLine}
        onClick={() => {}}
        toltipLabel="Notificações"
      />
      <DSIconButton
        aria-label="Add"
        customIcon={RiUserAddLine}
        onClick={() => {}}
        toltipLabel="Adicionar Usuário"
      />
      <DSIconButton
        aria-label="Logout"
        customIcon={RiLogoutBoxLine}
        onClick={logout}
        toltipLabel="Sair"
      />
    </HStack>
  );
}
