import {
  RiBookLine,
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
  RiLayoutGridLine
} from 'react-icons/ri';

import { Stack } from '@chakra-ui/react';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/">
          Dashboard
        </NavLink>

        <NavLink icon={RiInputMethodLine} href="/forms">
          Formulários
        </NavLink>

        <NavLink icon={RiGitMergeLine} href="/automation">
          Automação
        </NavLink>
      </NavSection>
      <NavSection title="CONTROLE">
        <NavLink icon={RiBookLine} href="/books">
          Livros
        </NavLink>

        <NavLink icon={RiLayoutGridLine} href="/categories">
          Categorias
        </NavLink>

        <NavLink icon={RiContactsLine} href="/users">
          Usuários
        </NavLink>
      </NavSection>
    </Stack>
  );
}
