import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import type { CreditsResponse } from "@/core";
import { MOVIE_ENDPOINT, TELEVISION_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const CreditsView = () => {
  const navigate = useNavigate();
  const { mediaType, id } = useParams();
  const endpoint = mediaType === "movie" ? `${MOVIE_ENDPOINT}/${id}/credits` : `${TELEVISION_ENDPOINT}/${id}/credits`;
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
      <h2 className="mb-6 font-bold text-2xl">Credits</h2>
      {data.cast.length ? (
        <ImageGrid onClick={(id) => navigate(`/person/${id}/career`)} results={gridData} />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
