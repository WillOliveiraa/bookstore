import Link from 'next/link';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { SubHeader } from '@/components/SubHeader';
import {
  Box,
  Button,
  Checkbox,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react';

import { Pagination } from '../../components/Pagination';

export default function BookList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  const actions = (
    <Link href="/users/create" passHref>
      <Button
        size="sm"
        fontSize="sm"
        colorScheme="pink"
        leftIcon={<Icon as={RiAddLine} fontSize="20" />}
      >
        Criar novo
      </Button>
    </Link>
  );

  return (
    <SubHeader title="Livros" actions={actions}>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th px="6" color="gray.300" width="8">
              <Checkbox colorScheme="pink" />
            </Th>
            <Th>Livros</Th>
            {isWideVersion && <Th>Data de Cadastro</Th>}
            <Th width="8">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td px={['4', '4', '6']}>
              <Checkbox colorScheme="pink" />
            </Td>
            <Td>
              <Box>
                <Text fontWeight="bold">Bíblia Sagrada</Text>
                <Text fontSize="sm" color="gray.300">
                  O mais vendido de todos
                </Text>
              </Box>
            </Td>
            {isWideVersion && <Td>08 de Março, 2023</Td>}
            <Td>
              <Button
                size="sm"
                fontSize="sm"
                colorScheme="purple"
                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
              >
                Editar
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Pagination />
    </SubHeader>
  );
}
