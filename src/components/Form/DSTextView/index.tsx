import { ReactNode } from 'react';

import { Text, TextProps } from '@chakra-ui/react';

interface TextViewProps extends TextProps {
  children: ReactNode;
}

export default function TextView({ children, ...rest }: TextViewProps) {
  return (
    <Text variant="primary" {...rest}>
      {children}
    </Text>
  );
}
