import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

import Header from '@/components/Header';
import { Container } from '@/components/Layout';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Box h="7px" bgGradient="linear(to-l, #ff4e00, #d72f22)" />
      <Container mt={4} maxW="960px">
        <Header />
        <Box as="main" role="main">
          {children}
        </Box>
      </Container>
    </>
  );
};

export default Layout;
