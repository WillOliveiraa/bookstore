import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<SignInFormData>({ resolver: yupResolver(signInFormSchema) });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" direction="column">
      <Flex align="center" gap="2">
        <Image src="/bookstore.png" width={100} height={100} alt="Book Store" />
        <Text fontSize={['3xl', '4xl']} fontWeight="bold" letterSpacing="tight">
          bookStore
          <Text as="span" ml="1" color="pink.500">
            .
          </Text>
        </Text>
      </Flex>
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        mt="10"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            {...register('email')}
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
          />

          <Input
            {...register('password')}
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
          />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={isSubmitting}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
