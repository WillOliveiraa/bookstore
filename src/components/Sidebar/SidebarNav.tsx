import {
  RiBookLine,
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine
} from 'react-icons/ri';

import { Stack } from '@chakra-ui/react';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">
          Dashboard
        </NavLink>

        <NavLink icon={RiContactsLine} href="/users">
          Usuários
        </NavLink>

        <NavLink icon={RiBookLine} href="/books">
          Livros
        </NavLink>
      </NavSection>
      <NavSection title="Automação">
        <NavLink icon={RiInputMethodLine} href="/forms">
          Formulários
        </NavLink>

        <NavLink icon={RiGitMergeLine} href="/automation">
          Automação
        </NavLink>
      </NavSection>
    </Stack>
  );
}
