import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import type { ImageCell, PersonCareerResponse } from "@/core";
import { getImageUrl, PERSON_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const CareerView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonCareerResponse>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
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
        <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/summary`)} />
      ) : (
        <p className="text-center text-gray-400">No career available.</p>
      )}
    </section>
  );
};
