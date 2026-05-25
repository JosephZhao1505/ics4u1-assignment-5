import { FaCalendarAlt, FaClock, FaDollarSign, FaFilm, FaStar, FaTv, FaWallet } from "react-icons/fa";
import { useParams } from "react-router-dom";
import type { MediaResponse } from "@/core";
import { MOVIE_ENDPOINT, TELEVISION_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const SummaryView = () => {
  const { mediaType, id } = useParams();
  const endpoint = mediaType === "movie" ? `${MOVIE_ENDPOINT}/${id}` : `${TELEVISION_ENDPOINT}/${id}`;
  const { data } = useTmdb<MediaResponse>(endpoint, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const isMovie = mediaType === "movie";

  // Helper to format currency
  const formatCurrency = (amount?: number) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      currency: "USD",
      maximumFractionDigits: 0,
      style: "currency",
    }).format(amount);
  };

  // Extract common display values based on media type
  const releaseDate = isMovie ? data.release_date : data.first_air_date;

  const runtime = isMovie ? data.runtime : data.episode_run_time && data.episode_run_time.length > 0 ? data.episode_run_time[0] : null;

  return (
    <section className="dynamic-fade-in animate-fade-in space-y-6 text-gray-300">
      {/* Overview */}
      <div className="space-y-2">
        <h3 className="font-semibold text-white text-xl">Storyline</h3>
        <p className="text-base text-gray-400 leading-relaxed">{data.overview || "No overview available for this title."}</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Rating */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-800/60 bg-gray-900/50 p-4">
          <FaStar className="h-5 w-5 text-amber-500" />
          <div>
            <p className="font-medium text-gray-500 text-xs uppercase tracking-wider">Rating</p>
            <p className="font-semibold text-white">
              {data.vote_average ? `${data.vote_average.toFixed(1)} / 10` : "NR"}
              <span className="ml-1 font-normal text-gray-500 text-xs">({data.vote_count})</span>
            </p>
          </div>
        </div>

        {/* Runtime */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-800/60 bg-gray-900/50 p-4">
          <FaClock className="h-5 w-5 text-indigo-400" />
          <div>
            <p className="font-medium text-gray-500 text-xs uppercase tracking-wider">{isMovie ? "Runtime" : "Average Runtime"}</p>
            <p className="font-semibold text-white">{runtime ? `${runtime} mins` : "N/A"}</p>
          </div>
        </div>

        {/* Release / Air Date */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-800/60 bg-gray-900/50 p-4">
          <FaCalendarAlt className="h-5 w-5 text-emerald-400" />
          <div>
            <p className="font-medium text-gray-500 text-xs uppercase tracking-wider">{isMovie ? "Release Date" : "First Aired"}</p>
            <p className="font-semibold text-white">
              {releaseDate
                ? new Date(releaseDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                : "Unknown"}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-800/60 bg-gray-900/50 p-4">
          {isMovie ? <FaFilm className="h-5 w-5 text-sky-400" /> : <FaTv className="h-5 w-5 text-sky-400" />}
          <div>
            <p className="font-medium text-gray-500 text-xs uppercase tracking-wider">Status</p>
            <p className="font-semibold text-white">{data.status || "Unknown"}</p>
          </div>
        </div>
      </div>

      {/* Genres & Meta Info */}
      <div className="flex flex-wrap gap-6 pt-2">
        <div className="space-y-2">
          <h4 className="font-medium text-gray-500 text-xs uppercase tracking-wider">Genres</h4>
          <div className="flex flex-wrap gap-2">
            {data.genres?.map((genre) => (
              <span
                className="rounded-full border border-gray-700/40 bg-gray-800 px-3 py-1 font-medium text-gray-300 text-sm"
                key={genre.id}
              >
                {genre.name}
              </span>
            )) || <span className="text-gray-500 text-sm">None listed</span>}
          </div>
        </div>

        {/* TV Specific Sub-data: Seasons & Episodes Counter */}
        {!isMovie && (data.number_of_seasons || data.number_of_episodes) && (
          <div className="flex gap-6">
            {data.number_of_seasons && (
              <div className="space-y-1">
                <h4 className="font-medium text-gray-500 text-xs uppercase tracking-wider">Seasons</h4>
                <p className="font-medium text-white">{data.number_of_seasons}</p>
              </div>
            )}
            {data.number_of_episodes && (
              <div className="space-y-1">
                <h4 className="font-medium text-gray-500 text-xs uppercase tracking-wider">Total Episodes</h4>
                <p className="font-medium text-white">{data.number_of_episodes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Movie Financial Details Box */}
      {isMovie && ((data.budget ?? 0) > 0 || (data.revenue ?? 0) > 0) && (
        <div className="mt-4 border-gray-800/60 border-t pt-6">
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-900 bg-gray-950/40 p-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <FaWallet className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-gray-500 text-xs">Budget</p>
                <p className="font-medium text-gray-200 text-sm">{formatCurrency(data.budget)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaDollarSign className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-gray-500 text-xs">Revenue</p>
                <p className="font-medium text-emerald-400 text-sm">{formatCurrency(data.revenue)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
