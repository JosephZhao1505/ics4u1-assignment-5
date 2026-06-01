import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, ImageOverlay } from "@/components";
import type { ImageCell, MediaResponse } from "@/core";
import { cartAction, favoriteAction, getImageUrl, TELEVISION_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MediaResponse>(`${TELEVISION_ENDPOINT}/${id}`, {});
  const { cart, favorites, toggleFavorite, toggleCart } = useUserContext();
  let priceDisplay = null;

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (data.first_air_date) {
    const currentYear = new Date().getFullYear();
    const releaseDate = new Date(data.first_air_date).getFullYear();
    const mediaAge = currentYear - releaseDate;

    const basePrice = 19.99;
    const floorPrice = 4.99;

    const finalPrice = basePrice - mediaAge;

    priceDisplay = Math.max(finalPrice, floorPrice);
  }

  const gridData: ImageCell[] = (data?.seasons ?? [])
    .filter((result) => result.season_number > 0 && result.name)
    .map((result) => ({
      id: result.season_number,
      imageUrl: getImageUrl(result.poster_path),
      media: "tv",
      price: priceDisplay ?? 9.99,
      primaryText: result.name,
      secondaryText: result.air_date,
    }));

  return (
    <section className="px-2">
      <h2 className="mb-6 font-bold text-2xl">Seasons</h2>
      {data.seasons?.length ? (
        <ImageGrid images={gridData} onClick={(season_number) => navigate(`/tv/${id}/season/${season_number.id}`)}>
          {(image) => (
            <ImageOverlay
              actions={[
                cartAction((image: ImageCell) => cart.has(image.id), toggleCart),
                favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite),
              ]}
              image={image}
            />
          )}
        </ImageGrid>
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
