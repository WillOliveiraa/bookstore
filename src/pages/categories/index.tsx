import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { SubHeader } from '@/components/SubHeader';
import { useEditCategory } from '@/context/categories/EditCategoryContext';
import { Button, Checkbox, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { Pagination } from '../../components/Pagination';
import { api } from '../../lib/axios';
import CategoryModel from '../../models/category_model';
import { CategoriesUrl } from '../../utlis/urls';

export default function CategoriesList() {
  const { setSelectedCategory } = useEditCategory();
  const router = useRouter();

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
        leftIcon={<Icon as={RiAddLine} fontSize="20" />}
      >
        Criar nova
      </Button>
    </Link>
  );

  return (
    <SubHeader title="Categorias" actions={actions}>
      <Table colorScheme="whiteAlpha">
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
                    <Link href={CategoriesUrl.front.create} passHref>
                      <Button
                        size="sm"
                        fontSize="sm"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                        onClick={() => handleEditCategory(category)}
                      >
                        Editar
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <Pagination />
    </SubHeader>
  );
}
