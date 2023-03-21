import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { useEditCategory } from '../../contexts/categories/EditCategoryContext';
import { api } from '../../lib/axios';
import CategoryModel from '../../models/category_model';
import { CategorySchema } from '../../schemas/category_schema';
import { CategoriesUrl } from '../../utlis/urls';

export default function CreateCategory() {
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
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateCategory)}
        >
          <Heading size="lg" fontWeight="normal">
            {isEdit ? 'Editar' : 'Criar'} Categoria
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                {...register('title', { value: selectedCategory?.title })}
                name="title"
                label="Título"
                error={errors.title}
              />
              <Input
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
                <Button colorScheme="whiteAlpha" onClick={() => setSelectedCategory(undefined)}>
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
