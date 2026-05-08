import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Footer, ImageGrid, Pagination } from "@/components";
import type { SearchResponse } from "@/core";
import { SEARCH_ENDPOINT } from "@/core";
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridData = (data?.results ?? []).map((result): any => ({
    id: result.id,
    imagePath: result.profile_path || result.poster_path,
    primaryText: result.name || result.title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-300 space-y-5 p-10">
      <h1 className="font-bold text-3xl text-white">Search for: {query}</h1>
      <ImageGrid
        onClick={(id) => {
          const firstTab = searchType === "movie" ? "credits" : searchType === "tv" ? "seasons" : "career";
          navigate(`/${searchType}/${id}/${firstTab}`);
        }}
        results={gridData}
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
