import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import { Image } from '@chakra-ui/image';
import { Button, IconButton } from '@chakra-ui/button';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

function TopManga() {
  const [topManga, setTopManga] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);

  const { search } = useLocation();

  const match = search.match(/page=([0-9]+)/);
  const pageNum = match ? match[1] : 1;
  const url = 'https://api.jikan.moe/v4/top/manga' + `?page=${pageNum}`;

  React.useEffect(() => {
    const fetchTopManga = async () => {
      const data = await axios.get(url);
      const response = data.data;
      setTopManga(response.data);
      // console.log(response);
      // console.log(response.data);
      // console.log(pageNum);
      setPage(response?.pagination?.current_page);
      setHasNextPage(response?.pagination?.has_next_page);
      setTotalPages(response?.pagination?.last_visible_page);
    };
    fetchTopManga();
  }, []);

  return (
    <>
      <Helmet>
        <title>Top Manga | PandaPages</title>
      </Helmet>
      <Navbar color='gray.400' />
      <Box
        w={{
          base: '90%',
          md: '80%',
          lg: '70%',
        }}
        mx='auto'
        py='2rem'
      >
        <Heading color={'gray.700'}>Top Manga</Heading>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(5, 1fr)',
          }}
          gap={6}
          mt='2rem'
        >
          {topManga.map((manga, index) => (
            <GridItem key={manga.mal_id}>
              <Box>
                <Image
                  w='100%'
                  h='350px'
                  objectFit={'cover'}
                  src={manga?.images?.jpg?.image_url}
                  borderRadius={10}
                />
              </Box>
              <Flex direction={'column'} mt='1rem' gap={3}>
                <Heading fontSize={'1rem'} color={'gray.700'}>
                  {manga?.title}
                </Heading>
                <Text color={'gray.700'}>
                  Chapters: {manga?.chapters || 'none'}
                </Text>
                <Text color={'gray.700'}>Score: {manga?.score}/10</Text>
                <Link href={`/manga/${manga.mal_id}`}>
                  <Button w='100%' colorScheme='teal' variant='outline'>
                    Read
                  </Button>
                </Link>
              </Flex>
            </GridItem>
          ))}
        </Grid>
        <Flex gap={1} mt='2rem' align={'center'}>
          <Link href={`/top-manga?page=${page}`}>
            <IconButton icon={<ArrowLeftIcon />} onClick={() => setPage(1)} />
          </Link>
          <Link href={`/top-manga?page=${page}`}>
            <IconButton
              icon={<ChevronLeftIcon />}
              fontSize='24px'
              onClick={() => (page > 1 ? setPage(page - 1) : setPage(1))}
            />
          </Link>
          Page {pageNum} of {totalPages}
          <Link href={`/top-manga?page=${page}`}>
            <IconButton
              icon={<ChevronRightIcon />}
              fontSize='24px'
              onClick={() =>
                hasNextPage ? setPage(page + 1) : setPage(totalPages)
              }
            />
          </Link>
          <Link href={`/top-manga?page=${page}`}>
            <IconButton
              icon={
                <ArrowRightIcon
                  onClick={() =>
                    page < totalPages ? setPage(page + 50) : setPage(totalPages)
                  }
                />
              }
            />
          </Link>
        </Flex>
      </Box>
    </>
  );
}

export default TopManga;
