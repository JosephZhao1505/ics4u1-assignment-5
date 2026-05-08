import { ImageGrid } from '@/components';
import type { MediaResponse } from '@/core';
import { TELEVISION_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MediaResponse>(`${TELEVISION_ENDPOINT}/${id}`, {});

  const gridData = (data?.seasons ?? [])
    .filter((result) => result.season_number > 0 && result.name)
    .map((result) => ({
      id: result.season_number,
      imagePath: result.poster_path,
      primaryText: result.name,
      secondaryText: result.air_date,
    }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <h2 className="mb-6 text-2xl font-bold">Seasons</h2>
      {data.seasons?.length ? (
        <ImageGrid results={gridData} onClick={(season_number) => navigate(`/tv/${id}/season/${season_number}`)} />
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
