import { useState } from 'react';

import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';

import DSTable from '@/components/DataDisplay/DSTable';
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
  useDisclosure
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import CustomAlertDialog from '../../components/AlertDialog';
import DSButton from '../../components/Form/DSButton';
import DSCheckbox from '../../components/Form/DSCheckbox';
import LayoutPage from '../../components/LayoutPage';
import { Pagination } from '../../components/Pagination';
import { SubHeader } from '../../components/SubHeader';
import { useEditCategory } from '../../contexts/categories/EditCategoryContext';
import { api } from '../../lib/axios';
import CategoryModel from '../../models/category_model';
import { Auth, CategoriesUrl } from '../../utils/urls';

const columns = [
  { label: 'Selecionar', accessor: 'select', sortable: false },
  { label: 'Título', accessor: 'title', sortable: true, sortbyOrder: 'desc', isBold: true },
  { label: 'Descrição', accessor: 'description', sortable: true },
  { label: 'Ações', accessor: 'actions', sortable: false }
];

export default function CategoriesList() {
  const [alertMessage, setAlertMessage] = useState('');
  const { setSelectedCategory } = useEditCategory();
  const router = useRouter();
  const { isOpen: isOpenRemove, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure();
  const { isOpen: isOpenAuth, onOpen: onOpenAuth, onClose: onCloseAuth } = useDisclosure();

  const { data: categories, isLoading } = useQuery(['getAllCategories'], async () => {
    try {
      const response = await api.get<CategoryModel[]>('/category');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        onOpenAuth();
        return;
      }
    }
  });

  async function handleEditCategory(data: CategoryModel) {
    setSelectedCategory(data);

    await router.push(`${CategoriesUrl.front.create}?category=${data.id}`);
  }

  const actionsCreate = (
    <DSButton icon={RiAddLine} href={CategoriesUrl.front.create}>
      Criar nova
    </DSButton>
  );

  async function onOpenAlert(title: string) {
    setAlertMessage(`Deseja realmente excluir a categoria ${title}?`);

    await new Promise((resolve) => setTimeout(resolve, 300));

    onOpenRemove();
  }

  function handleAuth() {
    router.push(Auth.front.login);
    onCloseAuth();
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

  function renderAlerts() {
    return (
      <>
        <CustomAlertDialog message={alertMessage} onClose={onCloseRemove} isOpen={isOpenRemove} />
        <CustomAlertDialog
          title="Alerta"
          message="Sua sessão foi expirada, será necessário fazer o login novamente."
          isConfirmation={false}
          onClose={handleAuth}
          isOpen={isOpenAuth}
        />
      </>
    );
  }

  return (
    <LayoutPage>
      {isLoading ? (
        renderSkaleton()
      ) : (
        <SubHeader title="Categorias" actions={actionsCreate}>
          <DSTable
            data={categories}
            columns={columns}
            editItem={handleEditCategory}
            removeItem={onOpenAlert}
          />

          <Pagination totalPage={categories?.length} />
          {renderAlerts()}
        </SubHeader>
      )}
    </LayoutPage>
  );
}
