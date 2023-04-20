import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useReadManga } from '../hooks/useReadManga';
import { Box, Image, Text } from '@chakra-ui/react';

function ReadManga() {
  const { search } = useLocation();
  const match = search.match(/chapterId=/);
  const chapterId = match.input;
  const chapter = chapterId.split('chapterId=')[1];
  console.log(chapter);

  const { chapter: chapterNum } = useReadManga(chapter);

  return (
    <>
      <Helmet>
        <title>Read Manga | PandaPages</title>
      </Helmet>
      <Navbar color='gray.400' />
      <Box
        h='100vh'
        w={{
          base: '90%',
          md: '80%',
          lg: '70%',
        }}
        mx='auto'
        my='1rem'
      >
        {chapterNum?.map((page) => (
          <Box w='100%' h='100%' key={page.page} bg='gray.300'>
            <Image src={page.img} h='100%' objectFit={'contain'} mx='auto' />
          </Box>
        ))}
      </Box>
    </>
  );
}

export default ReadManga;
