import { Heading } from '@chakra-ui/layout';
import React from 'react';
import { Helmet } from 'react-helmet';

function Recommendations() {
  return (
    <>
      <Helmet>
        <title>Recommendations | PandaPages</title>
      </Helmet>
      <Heading color={'black'}>Recommendations</Heading>
    </>
  );
}

export default Recommendations;
