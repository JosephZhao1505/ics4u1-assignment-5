import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import type { PersonCareerResponse } from "@/core";
import { PERSON_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const CareerView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonCareerResponse>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {});

  const gridData = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.title,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <h2 className="mb-6 font-bold text-2xl">Career</h2>
      {data.cast.length ? (
        <ImageGrid onClick={(id) => navigate(`/movie/${id}/credits`)} results={gridData} />
      ) : (
        <p className="text-center text-gray-400">No career available.</p>
      )}
    </section>
  );
};
