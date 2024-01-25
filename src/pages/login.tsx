import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import useLoginForm from '@/hooks/useLoginForm';
import validateLoginForm from '@/validations/login-form';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useLoginForm(submitForm, validateLoginForm);

  // This function is called when the form is being submitted
  async function submitForm() {
    setIsSubmitting(true); // Start of submission

    try {
      // Create an object with the data from the form
      const loginInfo = {
        email: values.email,
        password: values.password,
      };

      // Send data to the /api/login endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: any = await response.json();

      // Check if the response status is 200
      if (responseData.status === 200) {
        // Wait for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Redirect to the homepage
        router.push('/');
      }
    } catch (error) {
      // Wait for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Error al iniciar sesión');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  }

  return (
    <Container maxW="960px">
      <Flex align="center" justify="center" px={6} py={8} h={{ md: '100vh' }} direction="column">
        <Text fontFamily="body" fontWeight="bold" fontSize="1.5rem" color="#d72f22">
          moto+
        </Text>
        <Box mt={8} bg="white" borderRadius="lg" border="3px solid #e1e1e1" css={formStyle}>
          <VStack spacing={4} px={8} py={10}>
            <Text fontWeight="bold" color="#343947">
              Iniciar Sesión
            </Text>

            <form onSubmit={handleSubmit}>
              <VStack mt={6} width="380px">
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    placeholder="admin@motoplus.com.do"
                    onChange={handleChange}
                  />
                  {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    placeholder="••••••••"
                    onChange={handleChange}
                  />
                  {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
                </FormControl>

                <Button
                  type="submit"
                  width="full"
                  fontFamily="body"
                  fontSize=".9rem"
                  borderRadius="3px"
                  color="white"
                  bg="#de392c"
                  height="45px"
                  transition="all .2s ease-in-out"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  _hover={{
                    bg: '#000',
                  }}
                >
                  Iniciar Sesión
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>

        <Text mt={12} color="#747474" fontSize=".9rem">
          Motoplus © {new Date().getFullYear()}
        </Text>
      </Flex>
    </Container>
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
  input {
    color: #343947;
    font-size: 14.5px;
    font-family: 'Open Sans', sans-serif;
  }

  label {
    margin-bottom: 0.5rem;
    display: block;
  }

  input {
    border: 1px solid #e1e1e1;
    border-radius: 3px;
    font-weight: 450;
    padding: 0 12px;
    transition: 0.3s ease;
  }

  input {
    height: 40px;
  }

  input {
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
`;

export default LoginPage;
