import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ButtonGroup, Footer, ImageGrid, LinkGroup, Pagination } from "@/components";
import type { MoviesResponse, TvsResponse } from "@/core";
import { TRENDING_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const { mediaType } = useParams<{ mediaType: string }>();
  const interval = searchParams.get("interval") || "day";

  const { data } = useTmdb<MoviesResponse | TvsResponse>(`${TRENDING_ENDPOINT}/${mediaType}/${interval}`, { page });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridData = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title || result.original_name,
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
        onClick={(id) => {
          const mediaNav = mediaType === "movie" ? "credits" : "seasons";
          navigate(`/${mediaType}/${id}/${mediaNav}`);
        }}
        results={gridData}
      />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      <Footer />
    </section>
  );
};
