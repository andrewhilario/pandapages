import { Box } from '@chakra-ui/layout';
import React from 'react';

function Layout({ children }) {
  return (
    <>
      <Box maxW={'1920px'} maxH={'1080px'}>
        {children}
      </Box>
    </>
  );
}

export default Layout;
