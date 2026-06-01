import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer, ImageGrid, ImageOverlay, Link, LinkGroup, Pagination } from "@/components";
import type { ImageCell, MediaItem, MediaResponse } from "@/core";
import { DISCOVER_ENDPOINT, favoriteAction, getImageUrl, MOVIE_GENRES, TV_GENRES } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const GenreView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { favorites, toggleFavorite, preferredGenres } = useUserContext();
  const { mediaType } = useParams<{ mediaType: string }>();
  const { genre } = useParams<{ genre: string }>();

  const genres = mediaType === "movie" ? MOVIE_GENRES : TV_GENRES;

  const preferredIds = mediaType === "movie" ? (preferredGenres.movies ?? []) : (preferredGenres.tvs ?? []);
  const availableGenres = preferredIds.length > 0 ? genres.filter((g) => preferredIds.includes(g.id)) : genres;

  const activeGenre = availableGenres.find((index) => index.name.toLowerCase() === genre) || availableGenres[0];

  const ENDPOINT = `${DISCOVER_ENDPOINT}/${mediaType}`;
  const { data } = useTmdb<MediaResponse>(ENDPOINT, { page, with_genres: activeGenre.id });

  const gridData: ImageCell[] = (data?.results ?? []).map((result: MediaItem) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    media: "movie",
    primaryText: result.original_title || result.name || "Untitled",
  }));

  useEffect(() => {
    setPage(1);
  }, []);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-300 space-y-5 py-5">
      <div className="flex gap-3">
        <Link match={["/genre/movie/:genre"]} to="/genre/movie/action">
          Movies
        </Link>
        <Link match={["/genre/tv/:genre"]} to="/genre/tv/action">
          TV
        </Link>
      </div>
      <LinkGroup
        options={availableGenres.map((genre) => ({
          label: genre.name,
          to: `/genre/${mediaType}/${genre.name.toLowerCase()}`,
        }))}
      />
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
