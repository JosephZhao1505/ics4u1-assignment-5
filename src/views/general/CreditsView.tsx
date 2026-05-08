import { ImageGrid } from '@/components';
import type { CreditsResponse } from '@/core';
import { MOVIE_ENDPOINT, TELEVISION_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const CreditsView = () => {
  const navigate = useNavigate();
  const { mediaType, id } = useParams();
  const endpoint = mediaType === 'movie' ? `${MOVIE_ENDPOINT}/${id}/credits` : `${TELEVISION_ENDPOINT}/${id}/credits`;
  const { data } = useTmdb<CreditsResponse>(endpoint, {});

  const gridData = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imagePath: result.profile_path,
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <h2 className="mb-6 text-2xl font-bold">Credits</h2>
      {data.cast.length ? (
        <ImageGrid results={gridData} onClick={(id) => navigate(`/person/${id}/career`)} />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
