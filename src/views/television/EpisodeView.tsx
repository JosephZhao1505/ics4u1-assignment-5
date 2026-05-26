import { FaCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import type { SeasonsResponse } from "@/core";
import { getImageUrl, TELEVISION_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const EpisodeView = () => {
  const { id, seasonNumber } = useParams();
  const { data } = useTmdb<SeasonsResponse>(`${TELEVISION_ENDPOINT}/${id}/season/${seasonNumber}`, {});
  let priceDisplay = null;

  const gridData = (data?.episodes ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.still_path),
    primaryText: result.name,
    secondaryText: result.air_date,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (data.air_date) {
    const currentYear = new Date().getFullYear();
    const releaseDate = new Date(data.air_date).getFullYear();
    const mediaAge = currentYear - releaseDate;

    const basePrice = 19.99;
    const floorPrice = 4.99;

    const finalPrice = basePrice - mediaAge;

    priceDisplay = Math.max(finalPrice, floorPrice);
  }

  return (
    <section className="px-2">
      <div className="flex-1 space-y-4">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl">{data.name}</h1>
          </div>

          <div className="flex shrink-0 flex-col items-end">
            {!priceDisplay ? "" : <p className="mb-2 font-bold text-3xl">${priceDisplay.toFixed(2)}</p>}
            {/* button here */}
          </div>
        </div>
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
