import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import Layout from '@/components/Layout';
import OrderDropdown from '@/components/OrderDropdown';
import OrderItem from '@/components/OrderItem';
import ListQRCode from '@/components/QRCode';

const IndexPage = (): JSX.Element => {
  return (
    <Layout>
      <Box mt={10} as="section">
        <Text mb={4} fontSize="1rem" color="#343947">
          Elija su pedido según la fecha para crear el código QR correspondiente.
        </Text>
        <OrderDropdown />
      </Box>
      <Box mt={4} as="section">
        <OrderItem />
      </Box>
      <Box mt={10} as="section">
        <ListQRCode />
      </Box>
    </Layout>
  );
};

export default IndexPage;
