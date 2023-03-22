import { RiMenuLine } from 'react-icons/ri';

import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';
import SwitchTheme from './SwitchTheme';

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  const { user } = useAuth();

  return (
    <Flex as="header" w="100%" maxWidth="1480" h="20" mx="auto" mt="4" px="6" align="center">
      {!isWideVersion && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          aria-label="Open Navigation"
          mr="2"
        ></IconButton>
      )}
      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <SwitchTheme />

        <NotificationsNav />

        <Profile
          showProfileData={isWideVersion}
          name={user?.name}
          email={user?.email}
          avatarUrl={user?.avatarUrl}
        />
      </Flex>
    </Flex>
  );
}
