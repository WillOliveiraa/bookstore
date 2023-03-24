import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiCheckLine, RiCloseCircleLine } from 'react-icons/ri';

import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useColorMode,
  VStack
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import DSButton from '../../components/Form/DSButton';
import { DSInput } from '../../components/Form/DSInput';
import LayoutPage from '../../components/LayoutPage';
import { useEditCategory } from '../../contexts/categories/EditCategoryContext';
import { api } from '../../lib/axios';
import CategoryModel from '../../models/category_model';
import { CategorySchema } from '../../schemas/category_schema';
import { CategoriesUrl } from '../../utlis/urls';

export default function CreateCategory() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<CategoryModel>({ resolver: yupResolver(CategorySchema) });

  const router = useRouter();
  const {
    query: { category: categoryId }
  } = router;
  const isEdit = !!categoryId;

  const { selectedCategory, setSelectedCategory } = useEditCategory();

  const handleCreateCategory: SubmitHandler<CategoryModel> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      if (isEdit) {
        await api.put<CategoryModel[]>(
          `${CategoriesUrl.back.get}?id=${selectedCategory?.id}`,
          data
        );
      } else {
        await api.post<CategoryModel[]>(CategoriesUrl.back.category, data);
      }

      await router.push(CategoriesUrl.front.list);
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message);
        return;
      }
    }
  };

  return (
    <LayoutPage>
      <Box
        as="form"
        flex="1"
        borderRadius={8}
        bg={isDark ? 'gray.800' : 'gray.50'}
        p={['6', '8']}
        onSubmit={handleSubmit(handleCreateCategory)}
      >
        <Heading size="lg" fontWeight="semibold">
          {isEdit ? 'Editar' : 'Criar'} Categoria
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
            <DSInput
              {...register('title', { value: selectedCategory?.title })}
              name="title"
              label="Título"
              error={errors.title}
            />
            <DSInput
              {...register('description', { value: selectedCategory?.description })}
              name="description"
              label="Descrição"
              error={errors.description}
            />
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link href={CategoriesUrl.front.list} passHref>
              <DSButton
                size="md"
                bgColor="gray.500"
                hoverColorWeight="600"
                onClick={() => setSelectedCategory(undefined)}
                icon={RiCloseCircleLine}
              >
                Cancelar
              </DSButton>
            </Link>
            <DSButton
              size="md"
              hoverColorWeight="600"
              type="submit"
              isLoading={isSubmitting}
              icon={RiCheckLine}
            >
              Salvar
            </DSButton>
          </HStack>
        </Flex>
      </Box>
    </LayoutPage>
  );
}
