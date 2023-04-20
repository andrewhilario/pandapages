import axios from 'axios';
import { useEffect, useState } from 'react';

export function useReadManga(chapterId) {
  const [chapter, setChapter] = useState([]);

  useEffect(() => {
    try {
      async function getChapter() {
        const response = await axios.get(
          `https://api.consumet.org/meta/anilist-manga/read?chapterId=${chapterId}&provider=mangadex`,
        );

        const { data } = response;
        console.log(data);

        setChapter(data);
      }
      getChapter();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { chapter };
}
