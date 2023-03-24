import { forwardRef, ForwardRefRenderFunction } from 'react';

import { FieldError } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  useColorMode
} from '@chakra-ui/react';

interface DSInputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const DSInputBase: ForwardRefRenderFunction<HTMLInputElement, DSInputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} fontSize="lg" fontWeight="semibold">
          {label}
        </FormLabel>
      )}
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
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const DSInput = forwardRef(DSInputBase);
