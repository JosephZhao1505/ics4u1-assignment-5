import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import type { CreditsResponse, ImageCell } from "@/core";
import { getImageUrl, MOVIE_ENDPOINT, TELEVISION_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const CreditsView = () => {
  const navigate = useNavigate();
  const { mediaType, id } = useParams();
  const endpoint = mediaType === "movie" ? `${MOVIE_ENDPOINT}/${id}/credits` : `${TELEVISION_ENDPOINT}/${id}/credits`;
  const { data } = useTmdb<CreditsResponse>(endpoint, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.profile_path),
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  console.log(data.cast);
  return (
    <section className="px-2">
      <h2 className="mb-6 font-bold text-2xl">Credits</h2>
      {data.cast.length ? (
        <ImageGrid images={gridData} onClick={(image) => navigate(`/person/${image.id}/career`)} />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
