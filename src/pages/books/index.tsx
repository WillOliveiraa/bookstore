import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { SubHeader } from '@/components/SubHeader';
import { BrReal } from '@/lib/intl';
import {
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
import { useQuery } from '@tanstack/react-query';

import { Pagination } from '../../components/Pagination';
import AuthorModel from '../../features/book/data/models/author_model';
import CategoryModel from '../../features/book/data/models/category_model';
import { api } from '../../lib/axios';

interface Book {
  id: string;
  title: string;
  price: number;
  numPages: number;
  publishDate: Date;
  imageUrl: string;

  authors: AuthorModel[];
  categories: CategoryModel[];
}

export default function BookList() {
  const { data: books } = useQuery(['getAllBook'], async () => {
    try {
      const response = await api.get<Book[]>('/book');

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message);
        return;
      }
    }
  });

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
    // <EditBookContext.Provider>
    <SubHeader title="Livros" actions={actions}>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th px="6" color="gray.300" width="8">
              <Checkbox colorScheme="pink" />
            </Th>
            <Th>Título</Th>
            <Th>Categoria</Th>
            {isWideVersion && <Th>Data de Publicação</Th>}
            <Th>Preço</Th>
            <Th width="8">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {books &&
            books.map((book) => {
              return (
                <Tr key={book.id}>
                  <Td px={['4', '4', '6']}>
                    <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Text fontWeight="bold">{book.title}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.300">
                      {book.categories[0].title}
                    </Text>
                  </Td>
                  {isWideVersion && <Td>{dayjs(book.publishDate).format('DD/MM/YYYY')}</Td>}
                  <Td>{BrReal.format(book.price)}</Td>
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
              );
            })}
        </Tbody>
      </Table>
      <Pagination />
    </SubHeader>
    // </EditBookContext.Provider>
  );
}
