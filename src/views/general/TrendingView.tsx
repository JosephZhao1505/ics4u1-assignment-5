import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ButtonGroup, Footer, ImageGrid, ImageOverlay, LinkGroup, Pagination } from "@/components";
import type { ImageCell, MediaItem, MediaResponse } from "@/core";
import { favoriteAction, getImageUrl, TRENDING_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { favorites, toggleFavorite } = useUserContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const { mediaType } = useParams<{ mediaType: string }>();
  const interval = searchParams.get("interval") || "day";

  const { data } = useTmdb<MediaResponse>(`${TRENDING_ENDPOINT}/${mediaType}/${interval}`, { page });

  useEffect(() => {
    setPage(1);
  }, []);

  const gridData: ImageCell[] = (data?.results ?? []).map((result: MediaItem) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    media: "movie",
    primaryText: result.original_title || result.name || "Untitled",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-300 space-y-5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <LinkGroup
          options={[
            { label: "Movies", to: `/trending/movie?interval=${interval}` },
            { label: "TV", to: `/trending/tv?interval=${interval}` },
          ]}
        />

        <ButtonGroup
          onClick={(value) => setSearchParams({ interval: value })}
          options={[
            { label: "Today", value: "day" },
            { label: "Week", value: "week" },
          ]}
          value={interval}
        />
      </div>
      <ImageGrid
        images={gridData}
        onClick={(image) => {
          navigate(`/${mediaType}/${image.id}/summary`);
        }}
      >
        {(image) =>
          mediaType === "movie" ? (
            <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
          ) : (
            ""
          )
        }
      </ImageGrid>
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      <Footer />
    </section>
  );
};
