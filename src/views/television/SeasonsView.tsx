import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import type { MediaResponse } from "@/core";
import { TELEVISION_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

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
      <h2 className="mb-6 font-bold text-2xl">Seasons</h2>
      {data.seasons?.length ? (
        <ImageGrid onClick={(season_number) => navigate(`/tv/${id}/season/${season_number}`)} results={gridData} />
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
