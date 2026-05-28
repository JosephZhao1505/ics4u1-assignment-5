import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer, ImageGrid, ImageOverlay, LinkGroup, Pagination } from "@/components";
import type { ImageCell, MediaItem, MediaResponse } from "@/core";
import { favoriteAction, getImageUrl, MOVIE_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const MovieListsView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { favorites, toggleFavorite } = useUserContext();
  const { listType } = useParams<{ listType: string }>();
  const formattedList = listType?.replace("-", "_");
  const { data } = useTmdb<MediaResponse>(`${MOVIE_ENDPOINT}/${formattedList}`, { page });

  useEffect(() => {
    setPage(1);
  }, []);

  const gridData: ImageCell[] = (data?.results ?? []).map((result: MediaItem) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    media: "movie",
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-300 space-y-5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <LinkGroup
          options={[
            { label: "Now Playing", to: "/movies/now-playing" },
            { label: "Popular", to: "/movies/popular" },
            { label: "Top Rated", to: "/movies/top-rated" },
            { label: "Upcoming", to: "/movies/upcoming" },
          ]}
        />
      </div>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/summary`)}>
        {(image) => (
          <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
        )}
      </ImageGrid>
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      <Footer />
    </section>
  );
};
