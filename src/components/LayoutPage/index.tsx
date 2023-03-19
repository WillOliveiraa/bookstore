import { ReactNode } from 'react';

// import { NextPageContext } from 'next';
// import { myGet } from '@/middleware/my_get';
import { Flex } from '@chakra-ui/react';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutPage({ children }: LayoutProps) {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        {children}
      </Flex>
    </Flex>
  );
}

// LayoutPage.getInitialProps = async (ctx: NextPageContext) => {
//   console.log('test');
//   const json = await myGet('http://localhost:3000/api', ctx);
//   // const json = await myGet(`${Api.url}`, ctx);
//   return { LayoutPage: json };
// };
