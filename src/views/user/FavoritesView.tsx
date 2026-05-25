import { useMemo } from "react"; // [!code ++]
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, ImageOverlay, LinkGroup } from "@/components";
import { favoriteAction, type ImageCell } from "@/core";
import { useUserContext } from "@/hooks";

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { mediaType } = useParams();
  const { favorites, toggleFavorite } = useUserContext();

  // Filter favorites based on the active route parameter (movie or tv)
  const filteredFavorites = useMemo(() => {
    // [!code ++]
    const allFavorites = Array.from(favorites.values()); // [!code ++]
    if (!mediaType) return allFavorites; // Fallback if no mediaType is in the URL // [!code ++]
    // [!code ++]
    return allFavorites.filter((item) => item.media?.type === mediaType); // [!code ++]
  }, [favorites, mediaType]); // [!code ++]

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Favorites</h1>
      <LinkGroup
        options={[
          { label: "Movies", to: "/favorites/movie" },
          { label: "TV", to: "/favorites/tv" },
        ]}
      />
      {/* Check length of filtered results instead of the whole Set */}
      {filteredFavorites.length === 0 ? ( // [!code linenum:24]
        <p className="mt-10 text-gray-400">You have no favorites yet.</p>
      ) : (
        <ImageGrid images={filteredFavorites} onClick={(image) => navigate(`/${mediaType}/${image.id}/summary`)}>
          {" "}
          {/* [!code linenum:27] */}
          {(image) => (
            <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
          )}
        </ImageGrid>
      )}
    </section>
  );
};
