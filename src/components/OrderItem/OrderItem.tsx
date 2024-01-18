import { Box, Button, Flex, List, ListItem, Text } from '@chakra-ui/react';
import React from 'react';

import QRCodeGenerator from '@/services/qr-code-generator';
import useStore from '@/store/store';
import { QRCodeParams } from '@/types/index';

const OrderItem: React.FC = () => {
  const { selectedOrder, setQRCodes } = useStore();

  const handleGenerateQRCode = (qrCodeParams: QRCodeParams): any => {
    const { randomPartLength, seed, numberOfCodes, brand, code, size, type } = qrCodeParams;

    const qrGenerator = new QRCodeGenerator(seed);
    const qrCodes = qrGenerator.generateCodes(randomPartLength, numberOfCodes, brand, code, size, type);

    setQRCodes(qrCodes);
  };

  if (!selectedOrder) {
    return;
  }

  return (
    <List spacing={3} mt={4}>
      {selectedOrder.map((item, index) => (
        <ListItem key={index}>
          <Flex
            border="1px solid #eaeaea"
            bg="hsla(0,0%,94.9%, 40%)"
            borderRadius="4px"
            justify="space-between"
            align="center"
            py={2}
            px={2}
          >
            <Text fontFamily="body" fontSize=".9rem" fontWeight="500" color="#343947" pl={2}>
              <Box as="span" fontWeight="600">
                Artículo {index + 1}
              </Box>
              : {item.numberOfCodes} Códigos QR
            </Text>
            <Button
              height="32px"
              fontFamily="body"
              fontSize=".8rem"
              borderRadius="3px"
              color="white"
              bg="#de392c"
              transition="all .2s ease-in-out"
              onClick={() => handleGenerateQRCode(item)}
              _hover={{
                bg: '#000',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                <path d="M7 17l0 .01" />
                <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                <path d="M7 7l0 .01" />
                <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                <path d="M17 7l0 .01" />
                <path d="M14 14l3 0" />
                <path d="M20 14l0 .01" />
                <path d="M14 14l0 3" />
                <path d="M14 20l3 0" />
                <path d="M17 17l3 0" />
                <path d="M20 17l0 3" />
              </svg>
              <Box ml={1} as="span" textTransform="uppercase">
                Generar
              </Box>
            </Button>
          </Flex>
        </ListItem>
      ))}
    </List>
  );
};

export default OrderItem;
