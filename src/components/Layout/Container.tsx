import { Box, BoxProps } from '@chakra-ui/react';

interface ContainerProps extends BoxProps {
  children: React.ReactNode;
  maxW: string | string[] | number[];
}

const Container: React.FC<ContainerProps> = ({ children, maxW, ...rest }) => {
  return (
    <Box mx={[4, 8, 16]} {...rest}>
      <Box px={[2, 4]} mx="auto" maxW={maxW}>
        {children}
      </Box>
    </Box>
  );
};

export default Container;
