import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import FormFields from '@/components/FormFields';
import Layout from '@/components/Layout';
import useForm from '@/hooks/useForm';
import validateForm from '@/validations/formValidations';

const QRCodePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [qrCode, setQrCode] = useState('');
  const [isQrCodeValid, setIsQrCodeValid] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useForm(submitForm, validateForm);

  useEffect(() => {
    if (id) {
      const isValidQRCode = id.toString().match(/^([^-]+)-([\w-]+)-([^-]+)-([\w]{10})$/) !== null;
      setIsQrCodeValid(isValidQRCode);
      setQrCode(id as string);
    }
  }, [id]);

  async function submitForm() {
    try {
      // API call with environment variable
      console.log(values);
    } catch (error) {
      // Error handling
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
              El código QR que ha escaneado no es válido.
            </Text>
          </Flex>
        </Box>
      ) : (
        <>
          <Box as="section" mt={16} mb={10}>
            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <Text textAlign="center" fontSize="1.5rem" fontWeight="bold" color="#343947" mb={4}>
                ¡Gracias por escanear el código QR!
              </Text>
              <Text fontSize="1rem" color="#343947" textAlign="center">
                Por favor, complete el formulario a continuación con sus datos exactos.
              </Text>
            </Flex>
          </Box>

          <Box mt={4} maxWidth="800px" margin="0 auto" as="section" css={formStyle}>
            <form onSubmit={handleSubmit}>
              <Stack
                spacing={2}
                borderTop={{ base: 'none', md: '5px solid #e35549' }}
                borderRadius={{ base: 'none', md: '0px 0px 10px 10px' }}
                boxShadow={{ base: 'none', md: 'rgba(0, 0, 0, 0.08) 0px 0px 3px 1px' }}
                padding={{ base: 0, md: '3rem' }}
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
                  _hover={{
                    bg: '#000',
                  }}
                >
                  Enviar
                </Button>
              </Stack>
            </form>
          </Box>
        </>
      )}
    </Layout>
  );
};

const formStyle = css`
  div[role='group'] {
    margin-bottom: 1rem;
  }

  label {
    color: #343947;
    font-size: 14.5px;
    margin-bottom: 0.5rem;
    display: block;
  }

  input {
    height: 40px;
    color: #343947;
    border: 1px solid #e1e1e1;
    border-radius: 3px;
    font-weight: 450;
    font-size: 14.5px;
    padding: 0 12px;
    transition: 0.3s ease;

    &:focus {
      border-color: #e1e1e1;
      background-color: hsla(237.1, 64.3%, 96.1%, 10%);
      box-shadow:
        0px 0px 0px 2px white,
        0px 0px 0px 4px #7176e0;
    }

    &::placeholder {
      color: #343947;
      opacity: 0.8;
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
    color: hsl(228, 16%, 42%, 80%);
    font-size: 14.5px;
    font-weight: 450;
    border: 1px solid #e1e1e1;
    border-radius: 3px;
    padding: 0 12px;
    height: 45px;
    outline: none;
    opacity: 1;
    cursor: pointer;

    &:focus {
      border-color: #e1e1e1;
      background-color: hsla(237.1, 64.3%, 96.1%, 10%);
      box-shadow:
        0px 0px 0px 2px white,
        0px 0px 0px 4px #7176e0;
    }
  }

  textarea {
    height: 150px;
    color: #343947;
    border: 1px solid #e1e1e1;
    border-radius: 3px;
    padding: 12px 12px;
    font-weight: 500;
    font-size: 14.5px;
    resize: vertical;
    transition: 0.3s ease;

    &:focus {
      border-color: #e1e1e1;
      background-color: hsla(237.1, 64.3%, 96.1%, 10%);
      box-shadow:
        0px 0px 0px 2px white,
        0px 0px 0px 4px #7176e0;
    }

    &::placeholder {
      color: #343947;
      opacity: 0.8;
    }
  }
`;

export default QRCodePage;