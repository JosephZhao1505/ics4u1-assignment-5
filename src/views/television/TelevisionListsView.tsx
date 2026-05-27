import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer, ImageGrid, ImageOverlay, LinkGroup, Pagination } from "@/components";
import type { ImageCell, MediaResponse } from "@/core";
import { favoriteAction, getImageUrl, TELEVISION_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const TelevisionListsView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { favorites, toggleFavorite } = useUserContext();
  const { listType } = useParams<{ listType: string }>();

  const list = listType || "airing-today";
  const formattedList = list.replaceAll("-", "_");

  const { data } = useTmdb<MediaResponse>(`${TELEVISION_ENDPOINT}/${formattedList}`, { page });

  useEffect(() => {
    setPage(1);
  }, []);

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    media: "tv",
    primaryText: result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-300 space-y-5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <LinkGroup
          options={[
            { label: "Airing Today", to: "/tv/airing-today" },
            { label: "On The Air", to: "/tv/on-the-air" },
            { label: "Popular", to: "/tv/popular" },
            { label: "Top Rated", to: "/tv/top-rated" },
          ]}
        />
      </div>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${image.id}/summary`)}>
        {(image) => (
          <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
        )}
      </ImageGrid>
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      <Footer />
    </section>
  );
};
