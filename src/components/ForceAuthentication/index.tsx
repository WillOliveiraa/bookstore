import { ReactNode } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import router from 'next/router';
import Script from 'next/script';

import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import loadingIcon from '../../../public/loading.gif';
import { useAuth } from '../../contexts/AuthContext';

interface ForceAuthenticationProps {
  children: ReactNode;
}

export default function ForceAuthentication({ children }: ForceAuthenticationProps) {
  const { getMe, loading, user } = useAuth();

  function renderContent() {
    return (
      <>
        <Head>
          <Script
            dangerouslySetInnerHTML={{
              __html: `
                                if(!document.cookie?.includes("bookStore-userId")) {
                                    window.location.href = "/login"
                                }
                            `
            }}
          />
        </Head>
        {children}
      </>
    );
  }

  function renderLoading() {
    return (
      <Flex h="100vh" w="100wh" align="center" justify="center">
        <Image src={loadingIcon} alt="loading icon" />
      </Flex>
    );
  }

  useQuery(['me'], async () => {
    if (!user) {
      await getMe();
    }
    return null;
  });

  if (!loading && user?.email) {
    return renderContent();
  } else if (loading) {
    return renderLoading();
  } else {
    router.push('/login');
    return null;
  }
}
