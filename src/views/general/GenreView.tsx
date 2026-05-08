import { Footer, ImageGrid, Link, LinkGroup, Pagination } from '@/components';
import type { MoviesResponse, TvsResponse } from '@/core';
import { DISCOVER_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MOVIE_GENRES = [
  { name: 'Action', id: 28 },
  { name: 'Adventure', id: 12 },
  { name: 'Animation', id: 16 },
  { name: 'Crime', id: 80 },
  { name: 'Family', id: 10751 },
  { name: 'Fantasy', id: 14 },
  { name: 'History', id: 36 },
  { name: 'Horror', id: 27 },
  { name: 'Mystery', id: 9648 },
  { name: 'Sci-Fi', id: 878 },
];

const TV_GENRES = [
  { name: 'Action', id: 10759 },
  { name: 'Animation', id: 16 },
  { name: 'Comedy', id: 35 },
  { name: 'Crime', id: 80 },
  { name: 'Documentary', id: 99 },
  { name: 'Drama', id: 18 },
  { name: 'Family', id: 10751 },
  { name: 'Kids', id: 10762 },
  { name: 'Mystery', id: 9648 },
  { name: 'Sci-Fi', id: 10765 },
];

export const GenreView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { mediaType } = useParams<{ mediaType: string }>();
  const { genre } = useParams<{ genre: string }>();
  const genres = mediaType === 'movie' ? MOVIE_GENRES : TV_GENRES;
  const activeGenre = genres.find((index) => index.name.toLowerCase() === genre) || genres[0];

  const ENDPOINT = `${DISCOVER_ENDPOINT}/${mediaType}`;
  const { data } = useTmdb<MoviesResponse | TvsResponse>(ENDPOINT, { page, with_genres: activeGenre.id });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridData = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.title || result.name,
  }));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [mediaType, genre]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-300 space-y-5 py-5">
      <div className="flex gap-3">
        <Link to="/genre/movie/action" match={['/genre/movie/:genre']}>
          Movies
        </Link>
        <Link to="/genre/tv/action" match={['/genre/tv/:genre']}>
          TV
        </Link>
      </div>
      <LinkGroup
        options={genres.map((genre) => ({
          label: genre.name,
          to: `/genre/${mediaType}/${genre.name.toLowerCase()}`,
        }))}
      />
      <ImageGrid
        results={gridData}
        onClick={(id) => {
          const firstTab = mediaType === 'movie' ? 'credits' : 'seasons';
          navigate(`/${mediaType}/${id}/${firstTab}`);
        }}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      <Footer />
    </section>
  );
};
