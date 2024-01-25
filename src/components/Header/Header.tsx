import { Flex, HStack, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      if (response.ok) {
        // Redirect to the login page after logout
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Flex mb={8} pb={4} justify="space-between" align="center" borderBottom="1px solid hsla(0, 0%, 93%, 100%)">
      <Link
        as={NextLink}
        href={router.pathname === '/' ? '/' : '#'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontFamily="body" fontWeight="bold" fontSize="1.3rem" color="#d72f22">
          moto+
        </Text>
      </Link>

      {router.pathname === '/' && (
        <HStack spacing={6}>
          <Text fontWeight="600" fontSize=".9rem" color="#343947">
            <Link
              as={NextLink}
              href="#"
              onClick={handleLogout}
              _hover={{
                textDecoration: 'none',
              }}
            >
              Cerrar Sesión
            </Link>
          </Text>
        </HStack>
      )}
    </Flex>
  );
};

export default Header;
