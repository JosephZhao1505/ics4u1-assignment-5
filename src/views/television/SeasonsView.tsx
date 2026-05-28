import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, ImageOverlay } from "@/components";
import type { ImageCell, MediaResponse } from "@/core";
import { favoriteAction, getImageUrl, TELEVISION_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MediaResponse>(`${TELEVISION_ENDPOINT}/${id}`, {});
  const { favorites, toggleFavorite } = useUserContext();

  const gridData: ImageCell[] = (data?.seasons ?? [])
    .filter((result) => result.season_number > 0 && result.name)
    .map((result) => ({
      id: result.season_number,
      imageUrl: getImageUrl(result.poster_path),
      media: "tv",
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
        <ImageGrid images={gridData} onClick={(season_number) => navigate(`/tv/${id}/season/${season_number.id}`)}>
          {(image) => (
            <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
          )}
        </ImageGrid>
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
