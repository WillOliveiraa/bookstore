import { useState } from 'react';

import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';

// import { DataTable } from '@/components/DataTable';
import { SubHeader } from '@/components/SubHeader';
import { useEditCategory } from '@/contexts/categories/EditCategoryContext';
import {
  Box,
  Flex,
  SkeletonText,
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
// import data from '../../components/SortableTable/data.json';
import DSButton from '../../components/Form/DSButton';
import DSCheckbox from '../../components/Form/DSCheckbox';
import LayoutPage from '../../components/LayoutPage';
import { Pagination } from '../../components/Pagination';
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

  const { data: categories, isLoading } = useQuery(['getAllCategories'], async () => {
    try {
      const response = await api.get<CategoryModel[]>('/category');

      await new Promise((resolve) => setTimeout(resolve, 2000));

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
    <DSButton icon={RiAddLine} href={CategoriesUrl.front.create}>
      Criar nova
    </DSButton>
  );

  function onOpenAlert(title: string) {
    setAlertMessage(`Deseja realmente excluir a categoria ${title}?`);
    onOpen();
  }

  function renderTable() {
    return (
      <Table>
        <Thead>
          <Tr>
            <Th px="6" color="gray.300" width="8">
              <DSCheckbox colorScheme="primaryColor" iconColor="white" />
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
                    <DSCheckbox />
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
                      <DSButton
                        href={CategoriesUrl.front.create}
                        bgColor="secondary.500"
                        icon={RiPencilLine}
                        iconSize={16}
                        onClick={() => handleEditCategory(category)}
                      >
                        Editar
                      </DSButton>

                      <DSButton
                        bgColor="red.500"
                        icon={RiDeleteBinLine}
                        iconSize={16}
                        onClick={() => onOpenAlert(category.title)}
                      >
                        Excluir
                      </DSButton>
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    );
  }

  function renderSkaleton() {
    return (
      <Box flex="1" borderRadius={8} p="8" boxShadow="lg" bg="white">
        <SkeletonText width={200} noOfLines={1} skeletonHeight="6" />
        <SkeletonText mt={100} noOfLines={4} spacing="8" skeletonHeight="6" />
        <Box display="flex" justifyContent="space-between" mt={50}>
          <SkeletonText width={150} noOfLines={1} skeletonHeight="6" />
          <SkeletonText width={200} noOfLines={1} skeletonHeight="6" />
        </Box>
      </Box>
    );
  }

  return (
    <LayoutPage>
      {isLoading ? (
        renderSkaleton()
      ) : (
        <SubHeader title="Categorias" actions={actions}>
          {renderTable()}

          <Pagination totalPage={categories?.length} />
          {/* <DataTable columns={columns} data={categories ?? []} /> */}
          {/* <SortableTable data={data} /> */}
          <CustomAlertDialog message={alertMessage} onClose={onClose} isOpen={isOpen} />
        </SubHeader>
      )}
    </LayoutPage>
  );
}
