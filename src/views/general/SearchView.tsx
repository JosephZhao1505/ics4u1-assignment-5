import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Footer, ImageGrid, Pagination } from "@/components";
import type { ImageCell, SearchResponse } from "@/core";
import { getImageUrl, SEARCH_ENDPOINT } from "@/core";
import { useDebounce, useTmdb } from "@/hooks";

export const SearchView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const searchType = searchParams.get("type") ?? "movie";
  const debouncedQuery = useDebounce(query, 500);
  const { data } = useTmdb<SearchResponse>(`${SEARCH_ENDPOINT}/${searchType}`, { page, query: debouncedQuery });

  useEffect(() => {
    setPage(1);
  }, []);

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path ?? ""),
    primaryText: result.original_title || result.name || "Untitled",
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-300 space-y-5 p-10">
      <h1 className="font-bold text-3xl text-white">Search for: {query}</h1>
      <ImageGrid
        images={gridData}
        onClick={(image) => {
          const firstTab = searchType === "movie" ? "credits" : searchType === "tv" ? "seasons" : "career";
          navigate(`/${searchType}/${image.id}/${firstTab}`);
        }}
      />
      {data.results.length ? (
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      ) : (
        <p className="text-center text-gray-400">No search results found</p>
      )}
      <Footer />
    </section>
  );
};
