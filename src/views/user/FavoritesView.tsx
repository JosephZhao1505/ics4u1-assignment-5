import { useMemo } from "react"; // [!code ++]
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, ImageOverlay, LinkGroup } from "@/components";
import { favoriteAction, type ImageCell } from "@/core";
import { useUserContext } from "@/hooks";

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { mediaType } = useParams();
  const { favorites, toggleFavorite } = useUserContext();

  const filteredFavorites = useMemo(() => {
    const allFavorites = Array.from(favorites.values());
    if (!mediaType) return allFavorites;
    console.log(allFavorites);
    return allFavorites.filter((item) => item.media === mediaType);
  }, [favorites, mediaType]);

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Favorites</h1>
      <LinkGroup
        options={[
          { label: "Movies", to: "/favorites/movie" },
          { label: "TV", to: "/favorites/tv" },
        ]}
      />
      {filteredFavorites.length === 0 ? (
        <p className="mt-10 text-gray-400">You have no favorites yet.</p>
      ) : (
        <ImageGrid images={filteredFavorites} onClick={(image) => navigate(`/${mediaType}/${image.id}/summary`)}>
          {(image) => (
            <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
          )}
        </ImageGrid>
      )}
    </section>
  );
};
