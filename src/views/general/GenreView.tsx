import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer, ImageGrid, Link, LinkGroup, Pagination } from "@/components";
import type { MoviesResponse, TvsResponse } from "@/core";
import { DISCOVER_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

const MOVIE_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 80, name: "Crime" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 878, name: "Sci-Fi" },
];

const TV_GENRES = [
  { id: 10759, name: "Action" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10765, name: "Sci-Fi" },
];

export const GenreView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { mediaType } = useParams<{ mediaType: string }>();
  const { genre } = useParams<{ genre: string }>();
  const genres = mediaType === "movie" ? MOVIE_GENRES : TV_GENRES;
  const activeGenre = genres.find((index) => index.name.toLowerCase() === genre) || genres[0];

  const ENDPOINT = `${DISCOVER_ENDPOINT}/${mediaType}`;
  const { data } = useTmdb<MoviesResponse | TvsResponse>(ENDPOINT, { page, with_genres: activeGenre.id });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridData = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.title || result.name,
  }));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        options={genres.map((genre) => ({
          label: genre.name,
          to: `/genre/${mediaType}/${genre.name.toLowerCase()}`,
        }))}
      />
      <ImageGrid
        onClick={(id) => {
          const firstTab = mediaType === "movie" ? "credits" : "seasons";
          navigate(`/${mediaType}/${id}/${firstTab}`);
        }}
        results={gridData}
      />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      <Footer />
    </section>
  );
};
