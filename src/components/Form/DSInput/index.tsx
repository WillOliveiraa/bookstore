import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';

import { FieldError } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
  useColorMode
} from '@chakra-ui/react';

interface DSInputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const DSInputBase: ForwardRefRenderFunction<HTMLInputElement, DSInputProps> = (
  { name, label, error = null, iconLeft, iconRight, ...rest },
  ref
) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} fontSize="lg" fontWeight="medium">
          {label}
        </FormLabel>
      )}
      <InputGroup alignItems="center">
        {iconLeft && <InputLeftElement pointerEvents="none" children={iconLeft} mt="1" />}

        <ChakraInput
          id={name}
          name={name}
          focusBorderColor="pink.500"
          bgColor={isDark ? 'gray.900' : 'gray.100'}
          variant="filled"
          _hover={{ bgColor: isDark ? 'gray.900' : '' }}
          size="lg"
          ref={ref}
          {...rest}
        />

        {iconRight && (
          <InputRightElement mr="2" mt="1">
            {iconRight}
          </InputRightElement>
        )}
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const DSInput = forwardRef(DSInputBase);
