import { useState } from 'react';

import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';

// import { DataTable } from '@/components/DataTable';
import { SubHeader } from '@/components/SubHeader';
import { useEditCategory } from '@/contexts/categories/EditCategoryContext';
import {
  Button,
  Checkbox,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

// import { createColumnHelper } from '@tanstack/react-table';
import CustomAlertDialog from '../../components/AlertDialog';
import LayoutPage from '../../components/LayoutPage';
import { Pagination } from '../../components/Pagination';
// import data from '../../components/SortableTable/data.json';
import { api } from '../../lib/axios';
import CategoryModel from '../../models/category_model';
import { CategoriesUrl } from '../../utlis/urls';

// interface CategoryTableProps {
//   title: string;
//   description?: string;
//   // actions: void;
// }

export default function CategoriesList() {
  // const columnHelper = createColumnHelper<CategoryTableProps>();

  // const columns = [
  //   columnHelper.accessor('title', {
  //     cell: (info) => info.getValue(),
  //     header: 'Título'
  //   }),
  //   columnHelper.accessor('description', {
  //     cell: (info) => info.getValue(),
  //     header: 'Descrição'
  //   })
  //   // columnHelper.accessor('actions', {
  //   //   cell: (info) => info.getValue(),
  //   //   header: 'Ações'
  //   // })
  // ];

  const [alertMessage, setAlertMessage] = useState('');
  const { setSelectedCategory } = useEditCategory();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const { data: categories } = useQuery(['getAllCategories'], async () => {
    try {
      const response = await api.get<CategoryModel[]>('/category');

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message);
        return;
      }
    }
  });

  async function handleEditCategory(data: CategoryModel) {
    setSelectedCategory(data);

    await router.push(`${CategoriesUrl.front.create}?category=${data.id}`);
  }

  const actions = (
    <Link href={CategoriesUrl.front.create} passHref>
      <Button
        size="sm"
        fontSize="sm"
        colorScheme="pink"
        bgColor={isDark ? 'pink.500' : ''}
        _hover={{ bgColor: 'pink.700' }}
        textColor="white"
        leftIcon={<Icon as={RiAddLine} fontSize="20" />}
      >
        Criar nova
      </Button>
    </Link>
  );

  function onOpenAlert(title: string) {
    setAlertMessage(`Deseja realmente excluir a categoria ${title}?`);
    onOpen();
  }

  return (
    <LayoutPage>
      <SubHeader title="Categorias" actions={actions}>
        <Table variant="striped" colorScheme={isDark ? 'gray.200' : 'whiteAlpha'}>
          <Thead>
            <Tr>
              <Th px="6" color="gray.300" width="8">
                <Checkbox colorScheme="pink" />
              </Th>
              <Th>Título</Th>
              <Th>Descrição</Th>
              <Th width="8">Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories &&
              categories.map((category) => {
                return (
                  <Tr key={category.id}>
                    <Td px={['4', '4', '6']}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Text fontWeight="bold">{category.title}</Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm" color="gray.300">
                        {category.description}
                      </Text>
                    </Td>
                    <Td>
                      <Flex gap="2">
                        <Link href={CategoriesUrl.front.create} passHref>
                          <Button
                            size="sm"
                            fontSize="sm"
                            bgColor="secondary.500"
                            textColor="white"
                            _hover={{ bgColor: 'secondary.700' }}
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                            onClick={() => handleEditCategory(category)}
                          >
                            Editar
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          fontSize="sm"
                          bgColor="red.500"
                          textColor="white"
                          _hover={{ bgColor: 'red.600' }}
                          leftIcon={<Icon as={RiDeleteBinLine} fontSize="16" />}
                          onClick={() => onOpenAlert(category.title)}
                        >
                          Excluir
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        <Pagination totalPage={categories?.length} />
        {/* <DataTable columns={columns} data={categories ?? []} /> */}
        {/* <SortableTable data={data} /> */}
        <CustomAlertDialog message={alertMessage} onClose={onClose} isOpen={isOpen} />
      </SubHeader>
    </LayoutPage>
  );
}
