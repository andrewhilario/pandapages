import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Button } from '@chakra-ui/button';
import { Helmet } from 'react-helmet';

function Homepage() {
  const [randomManga, setRandomManga] = React.useState([]);

  React.useEffect(() => {
    const url = 'https://api.jikan.moe/v4/top/manga';

    const fetchData = async () => {
      const response = await fetch(url);
      const { data } = await response.json();
      const random = Math.floor(Math.random() * data.length);
      console.log(data[random]);
      setRandomManga(data[random]);
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | PandaPages</title>
      </Helmet>
      <Box w='100%' h='100vh' position={'relative'}>
        <Box
          w='100%'
          h='100%'
          position={'absolute'}
          bg={'black'}
          opacity={0.7}
          zIndex={-1}
        />
        <Box position={'absolute'} w='100%' h='100%' zIndex={-2}>
          <Image
            w='100%'
            h='100%'
            src={randomManga?.images?.jpg?.large_image_url}
            objectFit='cover'
          />
        </Box>
        <Navbar />
        <Flex
          w={{
            base: '90%',
            md: '80%',
            lg: '70%',
          }}
          mx='auto'
          py={{
            base: '2rem',
            md: '2rem',
            xl: '10rem',
          }}
          direction={{ base: 'column', md: 'column', lg: 'row' }}
        >
          <Box
            w={{
              base: '90%',
              md: '100%',
              lg: '50%',
            }}
            mx={{
              base: 'auto',
              md: 'auto',
              lg: '0',
            }}
          >
            <Image
              w={{
                base: '90%',
                md: '100%',
                lg: '250px',
              }}
              h='350px'
              borderRadius='10px'
              objectFit={{
                base: 'cover',
                lg: 'cover',
              }}
              src={randomManga?.images?.jpg?.large_image_url}
            />
          </Box>
          <Flex
            ml='2rem'
            direction={'column'}
            justify={'center'}
            mx={{
              base: 'auto',
              md: 'auto',
              lg: '0',
            }}
            py={{
              base: '2rem',
              md: '2rem',
              xl: '0',
            }}
          >
            <Flex direction={'column'} w='80%'>
              <Heading
                ml='2rem'
                fontSize={{
                  base: '1.5rem',
                  md: '2rem',
                  xl: '4rem',
                }}
                color={'white'}
              >
                {randomManga?.title}
              </Heading>
              <Text m='2rem' w='70%' fontSize={'1rem'} color={'white'}>
                {randomManga?.synopsis?.substring(0, 400) + '...'}
              </Text>
            </Flex>
            <Flex mx='2rem' direction={'row'} w='100%' gap='1rem'>
              <Button
                background='gray.900'
                color={'white'}
                fontWeight={'normal'}
                letterSpacing={'1px'}
              >
                Read
              </Button>
              <Button>Manga Info</Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Homepage;
