import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '@/components/Form/Input';
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

type CreateBookFormData = {
  title: string;
  price: string;
  publishDate: Date;
  numPage: number;
  imageUrl: string;
};

const createBookFormSchema = yup.object().shape({
  title: yup.string().required('Nome obrigatório'),
  price: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  numPage: yup.string().oneOf([yup.ref('password'), undefined], 'As senhas precisam ser iguais')
});

export default function CreateBook() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<CreateBookFormData>({ resolver: yupResolver(createBookFormSchema) });

  const handleCreateBook: SubmitHandler<CreateBookFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(values);
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
          onSubmit={handleSubmit(handleCreateBook)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar Usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                {...register('title')}
                name="name"
                label="Nome completo"
                error={errors.title}
              />
              <Input
                {...register('price')}
                name="email"
                type="email"
                label="E-mail"
                error={errors.price}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                {...register('numPage')}
                name="password"
                type="password"
                label="Senha"
                error={errors.numPage}
              />
              <Input
                {...register('imageUrl')}
                name="imageUrl"
                type="password"
                label="Confirmação de senha"
                error={errors.imageUrl}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
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
