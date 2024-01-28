import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import FormFields from '@/components/FormFields';
import Layout from '@/components/Layout';
import useOrderForm from '@/hooks/useOrderForm';
import validateForm from '@/validations/order-form';

type ApiResponse = {
  status: number;
  message: string;
  data?: any;
};

const QRCodePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [qrCode, setQrCode] = useState('');
  const [isQrCodeValid, setIsQrCodeValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useOrderForm(submitForm, validateForm);

  useEffect(() => {
    if (id) {
      // const isValidQRCode = id.toString().match(/^([^-]+)-([\w-]+)-([^-]+)-([\w]{10})$/) !== null;
      // const isValidQRCode = id.toString().match(/^([\w-]+)-([\w-]+)-([\w-]+)-([\w-]+)-(\w{10})$/) !== null;
      const isValidQRCode = id.toString().match(/^([\w-]+)_([\w-]+)_([\w-]+)_([\w-]+)_(\w{10})$/) !== null;

      setIsQrCodeValid(isValidQRCode);
      setQrCode(id as string);
    }
  }, [id]);

  // This function is called when the form is being submitted
  async function submitForm() {
    setIsSubmitting(true); // Start of submission

    // Send data to the /api/scan-qrcode endpoint
    try {
      // Create an object with the data from the form
      const buyerInfo = {
        storeId: values.store,
        fullName: values.fullName,
        qrCodeNumber: qrCode,
        phoneNumber: values.phoneNumber,
        notes: values.note,
      };

      const response = await fetch('/api/scan-qrcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buyerInfo),
      });

      // Check for a 429 Too Many Requests response
      if (response.status === 429) {
        // Handle the rate limit error here
        alert(
          'Ese número de teléfono ha excedido su cuota de envíos y no podemos procesar más envíos para este número.',
        );
        console.error('Error: Too many requests. Please try again later.');
        setIsSubmittedSuccessfully(false);
        return; // Stop further execution in this block
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: ApiResponse = await response.json();

      // Check if the response status is 200 and update isSubmittedSuccessfully
      if (responseData.status === 200) {
        setIsSubmittedSuccessfully(true);
      }

      // Handle other response data as needed
    } catch (error) {
      setIsSubmittedSuccessfully(false); // Reset in case of error
      console.error(error);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  }

  return (
    <Layout>
      {!isQrCodeValid ? (
        <Box as="section" mt={16} mb={10}>
          <Flex justifyContent="center" alignItems="center" flexDirection="column">
            <Text textAlign="center" fontSize="1.5rem" fontWeight="bold" color="#343947" mb={4}>
              ¡Gracias por escanear el código QR!
            </Text>
            <Text fontSize="1rem" color="#343947" textAlign="center">
              El código QR que has escaneado no es válido.
            </Text>
          </Flex>
        </Box>
      ) : (
        <Box
          mb={{
            base: 16,
            md: 32,
          }}
        >
          <Box
            as="section"
            mt={{
              base: 8,
              md: 16,
            }}
            mb={10}
          >
            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <Text textAlign="center" fontSize="1.5rem" fontWeight="bold" color="#343947" mb={4}>
                ¡Gracias por escanear el código QR!
              </Text>
              <Text fontSize="1rem" color="#343947" textAlign="center">
                Por favor, complete el formulario a continuación con sus datos exactos.
              </Text>
            </Flex>
          </Box>
          <Box mt={4} maxWidth="800px" margin="0 auto" as="section">
            {isSubmittedSuccessfully && (
              <Alert status="success" borderRadius="sm" bg="#D5F8E0" mb={4}>
                <AlertIcon />
                <AlertDescription fontFamily="body" fontSize=".9rem">
                  El formulario ha sido enviado con éxito.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack
                spacing={2}
                borderTop={{ base: 'none', md: '5px solid #e35549' }}
                borderRadius={{ base: 'none', md: '0px 0px 10px 10px' }}
                boxShadow={{ base: 'none', md: 'rgba(0, 0, 0, 0.08) 0px 0px 3px 1px' }}
                padding={{ base: 0, md: '3rem' }}
                css={formStyle}
              >
                <FormFields values={values} errors={errors} handleChange={handleChange} qrCode={qrCode} />
                <Button
                  type="submit"
                  fontFamily="body"
                  fontSize=".9rem"
                  borderRadius="3px"
                  color="white"
                  bg="#de392c"
                  height="45px"
                  transition="all .2s ease-in-out"
                  disabled={isSubmitting || isSubmittedSuccessfully}
                  _hover={{
                    bg: '#000',
                  }}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      )}
    </Layout>
  );
};

const formStyle = css`
  div[role='group'] {
    margin-bottom: 1rem;
  }

  [id^='field-:r'][id$=':-feedback'] {
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
  }

  label,
  input,
  select,
  textarea {
    color: #343947;
    font-size: 14.5px;
    font-family: 'Open Sans', sans-serif;
  }

  label {
    margin-bottom: 0.5rem;
    display: block;
  }

  input,
  select,
  textarea {
    border: 1px solid #e1e1e1;
    border-radius: 3px;
    font-weight: 450;
    padding: 0 12px;
    transition: 0.3s ease;
  }

  input,
  textarea {
    height: 40px;
  }

  textarea {
    height: 150px;
    resize: vertical;
    padding: 12px 12px;
  }

  input,
  select,
  textarea {
    &:focus {
      border-color: #e1e1e1;
      background-color: hsla(237.1, 64.3%, 96.1%, 10%);
      box-shadow:
        0px 0px 0px 2px white,
        0px 0px 0px 4px #7176e0;
    }

    &::placeholder {
      opacity: 0.8;
    }

    &:disabled {
      opacity: 1 !important;
    }
  }

  input[aria-invalid='true'] {
    border-color: #ff4c4c;

    &:focus {
      border-color: #ff4c4c;
      background-color: #fff;
      box-shadow: 0 0 0 1px #ff4c4c;
    }
  }

  select {
    height: 45px;
    outline: none;
    opacity: 1;
    cursor: pointer;
  }
`;

export default QRCodePage;
