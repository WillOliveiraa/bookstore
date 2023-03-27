import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { RiEyeLine, RiEyeOffLine, RiLock2Line, RiLoginBoxLine, RiUser3Line } from 'react-icons/ri';

import { Flex, Icon, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import DSIconButton from '../../components/DSIconButton';
import DSButton from '../../components/Form/DSButton';
import { DSInput } from '../../components/Form/DSInput';
import { useAuth } from '../../contexts/AuthContext';
import { LoginModel } from '../../models/login_model';
import { LoginSchema } from '../../schemas/login_schema';

const loginSchema = LoginSchema();

export default function Login() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<LoginModel>({ resolver: yupResolver(loginSchema) });

  const { login } = useAuth();

  const [show, setShow] = useState(false);

  const handleShowOrHidePass = () => setShow(!show);

  const handleLogin: SubmitHandler<LoginModel> = async (data) => {
    await login(data);
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      direction="column"
      bg={isDark ? 'gray.900' : ''}
    >
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
        bg={isDark ? 'gray.800' : 'gray.50'}
        p="8"
        mt="10"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Stack spacing="4">
          <DSInput
            {...register('email')}
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            iconLeft={<Icon as={RiUser3Line} />}
          />

          <DSInput
            {...register('password')}
            name="password"
            type={show ? 'text' : 'password'}
            label="Senha"
            error={errors.password}
            iconLeft={<Icon as={RiLock2Line} />}
            iconRight={
              <DSIconButton
                customIcon={show ? RiEyeOffLine : RiEyeLine}
                aria-label="Show or hide password"
                onClick={handleShowOrHidePass}
              />
            }
          />
        </Stack>

        <DSButton
          type="submit"
          mt="8"
          size="lg"
          colorScheme="pink"
          fontSize="md"
          isLoading={isSubmitting}
          icon={RiLoginBoxLine}
        >
          Entrar
        </DSButton>
      </Flex>
    </Flex>
  );
}
