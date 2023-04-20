import axios from 'axios';
import { useEffect, useState } from 'react';

export function useMangaTitle(id) {
  const [mangaTitle, setMangaTitle] = useState([]);
  const [mangaInfo, setMangaInfo] = useState([]);

  useEffect(() => {
    async function getTitle() {
      // const response = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);
      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      const data = await response.json();
      const { title } = data?.data;
      setMangaTitle(title);
      setMangaInfo(data?.data);
      console.log(data.data.title);
    }
    getTitle();
  }, []);

  return { mangaTitle, mangaInfo };
}

export function useMangaInfo(title, id) {
  const [mangaInfo, setMangaInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      async function getInfo() {
        setIsLoading(true);
        const response = await fetch(
          `https://api.consumet.org/meta/anilist-manga/${title}`,
        );
        const data = await response.json();
        const results = data.results;
        const filteredResults = results.filter((result) => {
          return result.malId === id;
        });
        if (!filteredResults) {
          console.log('No results found');
        }
        const info = await fetch(
          `https://api.consumet.org/meta/anilist-manga/info/${filteredResults[0]?.id}?provider=mangadex`,
        );

        if (info.status === 200 || info.status === 201) {
          const infoData = await info.json();
          const infoRes = infoData;

          // console.log(infoData);

          if (filteredResults !== undefined || filteredResults.length === 0) {
            setMangaInfo(infoRes);
            setIsLoading(false);
          } else {
            setMangaInfo(filteredResults[0]);
            setIsLoading(false);
          }
        } else {
          const info2 = await fetch(
            `https://api.consumet.org/manga/mangadex/${title}`,
          );
          const infoData2 = await info2.json();
          const results = infoData2.results;

          // console.log(results[0]);

          const resultData = results[0];

          const resData = await fetch(
            'https://api.consumet.org/manga/mangadex/info?id={id}',
          );

          const data = await resData.json();
          const res = data.results;
          const firstResult = res[0];

          const infoRes = {
            ...resultData,
            ...firstResult,
          };

          // console.log(infoRes);

          // setMangaInfo(filteredResults[0]);
        }
      }
      getInfo();
    } catch (error) {
      console.log(error);
    }
  }, [title, id]);

  return { mangaInfo, isLoading };
}
