import { Checkbox, CheckboxProps } from '@chakra-ui/react';

interface DSCheckboxProps extends CheckboxProps {}

export default function DSCheckbox({ ...rest }: DSCheckboxProps) {
  return <Checkbox colorScheme="primaryColor" iconColor="white" {...rest} />;
}
