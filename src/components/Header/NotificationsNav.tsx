import { RiLogoutBoxLine, RiNotificationLine, RiUserAddLine } from 'react-icons/ri';

import { HStack } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';
import IconButton from '../IconButton';

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
      <IconButton
        arialLabel="Notification"
        icon={RiNotificationLine}
        onClick={() => {}}
        toltipLabel="Notificações"
      />
      <IconButton
        arialLabel="Add"
        icon={RiUserAddLine}
        onClick={() => {}}
        toltipLabel="Adicionar Usuário"
      />
      <IconButton arialLabel="Logout" icon={RiLogoutBoxLine} onClick={logout} toltipLabel="Sair" />
    </HStack>
  );
}
