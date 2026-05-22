import { FaCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import type { SeasonsResponse } from "@/core";
import { getImageUrl, TELEVISION_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const EpisodeView = () => {
  const { id, seasonNumber } = useParams();
  const { data } = useTmdb<SeasonsResponse>(`${TELEVISION_ENDPOINT}/${id}/season/${seasonNumber}`, {});

  const gridData = (data?.episodes ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.still_path),
    primaryText: result.name,
    secondaryText: result.air_date,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <div className="flex-1 space-y-4">
        <h1 className="font-bold text-3xl">{data?.name}</h1>
        <p className="flex items-center gap-2 text-gray-400">
          <FaCalendarAlt />
          {data?.air_date}
        </p>
        <p className="text-gray-300">{data.overview}</p>
        <h3 className="font-bold text-2xl">Episodes</h3>
        {data.episodes?.length ? <ImageGrid images={gridData} /> : <p className="text-center text-gray-400">No episodes available.</p>}
      </div>
    </section>
  );
};
