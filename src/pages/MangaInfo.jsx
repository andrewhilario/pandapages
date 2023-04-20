import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { useMangaTitle, useMangaInfo } from '../hooks/useMangaInfo';

function MangaInfo() {
  const params = useParams();
  const id = Number(params.id);
  const { mangaTitle, mangaInfo: alternativeMangaInfo } = useMangaTitle(id);
  const { mangaInfo, isLoading } = useMangaInfo(mangaTitle, id);

  // console.log(alternativeMangaInfo);
  // console.log(mangaInfo);

  return (
    <>
      <Helmet>
        <title>
          {mangaInfo?.title?.english ||
            alternativeMangaInfo?.title ||
            'No title'}{' '}
          | PandaPages
        </title>
      </Helmet>
      <Navbar color='gray.400' />
      <Flex
        w={{
          base: '90%',
          md: '80%',
          lg: '70%',
        }}
        mx='auto'
        py='2rem'
        mt='3rem'
        gap={'1rem'}
        direction={{
          base: 'column',
          md: 'column',
          lg: 'row',
        }}
      >
        <Box
          w={{
            base: '100%',
            md: '100%',
            lg: '40%',
          }}
          mx='auto'
        >
          <Image
            w={{
              base: '100%',
              md: '100%',
              lg: '350px',
            }}
            h='500px'
            src={
              alternativeMangaInfo?.images?.jpg?.image_url ||
              mangaInfo?.image ||
              'https://via.placeholder.com/250x350'
            }
            objectFit={{
              base: 'contain',
              md: 'contain',
              lg: 'cover',
            }}
            borderRadius={10}
          />
        </Box>
        <Flex
          w={{
            base: '80%',
            md: '80%',
          }}
          direction={'column'}
        >
          <Heading color={'gray.700'}>
            {mangaInfo?.title?.english ||
              alternativeMangaInfo?.title ||
              'No title'}
          </Heading>
          <Text
            w={{
              base: '100%',
              md: '100%',
              lg: '80%',
            }}
            mt='1rem'
          >
            {mangaInfo?.description?.substring(0, 250) ||
              alternativeMangaInfo?.background?.substring(0, 250) ||
              'No description'}
          </Text>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
            my='2rem'
            gap={6}
          >
            <Text>Chapters: {alternativeMangaInfo?.chapters}</Text>
            <Text>
              Genres:{' '}
              {alternativeMangaInfo?.genres?.map((genre) => {
                return genre.name + ', ';
              })}
            </Text>
            <Text>Rank: {alternativeMangaInfo?.rank} </Text>
            <Text>Score: {alternativeMangaInfo?.score} / 10 </Text>
            <Text>
              Start & Finish Date: {alternativeMangaInfo?.published?.string}
            </Text>
            <Text>Status: {alternativeMangaInfo?.status}</Text>
            <Text>Type: {alternativeMangaInfo?.type}</Text>
            <Text>Volumes: {alternativeMangaInfo?.volumes || 'No Volume'}</Text>
            <Text>
              Author/s:{' '}
              {alternativeMangaInfo?.authors?.map((author) => {
                return author.name;
              })}
            </Text>
          </Grid>
          <Flex direction={'row'} align={'center'}>
            <Button colorScheme='gray'>Add to Library</Button>
          </Flex>
        </Flex>
      </Flex>
      <Box
        w={{
          base: '90%',
          md: '80%',
          lg: '70%',
        }}
        mx='auto'
      >
        <Heading color={'gray.700'} my='2rem'>
          Chapters
        </Heading>

        <Grid
          w='100%'
          templateColumns={{
            base: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
            xl: 'repeat(7, 1fr)',
          }}
          gap={6}
          py='1rem'
          mx='auto'
        >
          {isLoading ? (
            <>
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
              <Skeleton height='50px' />
            </>
          ) : (
            mangaInfo?.chapters?.map((chapter) => {
              return (
                <GridItem key={chapter.id}>
                  <Link w='50%' href={`/read-manga?chapterId=` + chapter.id}>
                    <Button w='100%' colorScheme='gray'>
                      <Text w='100%'>Ch.{chapter?.chapterNumber}</Text>
                    </Button>
                  </Link>
                </GridItem>
              );
            })
          )}
        </Grid>
      </Box>
    </>
  );
}

export default MangaInfo;
