import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import LogoName from '../assets/logo1.png';
import { Image } from '@chakra-ui/image';
import { Button } from '@chakra-ui/button';
import { Link } from 'react-router-dom';

function Navbar({ color }) {
  return (
    <>
      <Box w='100%' py='1.5rem' background={color}>
        <Flex
          w={{
            base: '90%',
            md: '80%',
            lg: '70%',
          }}
          align={'center'}
          justify={'space-between'}
          mx='auto'
        >
          <Box w='20%'>
            <Image src={LogoName} alt='Logo' />
          </Box>
          <Flex pr='2rem' gap='1rem'>
            <Link to='/'>
              <Text
                _hover={{
                  color: 'teal.300',
                  transition: '0.3s',
                }}
                color={'white'}
              >
                Home
              </Text>{' '}
            </Link>
            <Link to='/top-manga'>
              <Text
                _hover={{
                  color: 'teal.300',
                  transition: '0.3s',
                }}
                color={'white'}
              >
                Top Manga
              </Text>
            </Link>
            <Link to='/recommendations'>
              <Text
                _hover={{
                  color: 'teal.300',
                  transition: '0.3s',
                }}
                color={'white'}
              >
                Recommendations
              </Text>
            </Link>
          </Flex>
          <Flex pr='2rem' gap='1rem'>
            <Button
              variant='ghost'
              _hover={{
                bg: 'gray.800',
                color: 'white',
              }}
              color={'white'}
            >
              Login
            </Button>
            <Button
              variant={'outline'}
              _hover={{
                bg: 'gray.800',
              }}
              color={'white'}
            >
              Sign Up
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
