import { Footer, ImageGrid, LinkGroup, Pagination } from '@/components';
import type { MoviesResponse } from '@/core';
import { MOVIE_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const MovieListsView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { listType } = useParams<{ listType: string }>();
  const formattedList = listType?.replace('-', '_');
  const list = listType || 'now_playing';
  const { data } = useTmdb<MoviesResponse>(`${MOVIE_ENDPOINT}/${formattedList}`, { page });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [list]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-300 space-y-5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <LinkGroup
          options={[
            { label: 'Now Playing', to: '/movies/now-playing' },
            { label: 'Popular', to: '/movies/popular' },
            { label: 'Top Rated', to: '/movies/top-rated' },
            { label: 'Upcoming', to: '/movies/upcoming' },
          ]}
        />
      </div>
      <ImageGrid results={gridData} onClick={(id) => navigate(`/movie/${id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      <Footer />
    </section>
  );
};
