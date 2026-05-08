import { FaCalendarAlt } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { LinkGroup, Modal } from "@/components";
import type { MediaResponse } from "@/core";
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL, TELEVISION_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const MovieView = () => {
  const navigate = useNavigate();
  const { mediaType, id } = useParams();
  const endpoint = mediaType === "movie" ? `${MOVIE_ENDPOINT}/${id}` : `${TELEVISION_ENDPOINT}/${id}`;
  const { data } = useTmdb<MediaResponse>(endpoint, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="space-y-6 p-6">
        <div
          className="h-105 rounded-2xl bg-center bg-cover"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
          }}
        />
        <div className="flex gap-8">
          <img alt={data.title} className="h-82.5 w-55 rounded-xl object-cover" src={`${IMAGE_BASE_URL}${data.poster_path}`} />
          <div className="flex-1 space-y-4">
            <h1 className="font-bold text-3xl">{data.title ?? data.name}</h1>
            <p className="flex items-center gap-2 text-gray-400">
              <FaCalendarAlt />
              {data.release_date ?? data.first_air_date}
            </p>
            {mediaType === "tv" && (
              <p className="text-gray-400">
                {data.number_of_seasons} Seasons - {data.number_of_episodes} Episodes
              </p>
            )}
            <p className="text-gray-300">{data.overview}</p>
            <LinkGroup
              options={
                mediaType === "movie"
                  ? [
                      { label: "Credits", to: "credits" },
                      { label: "Trailers", to: "trailers" },
                      { label: "Reviews", to: "reviews" },
                    ]
                  : [
                      { label: "Seasons", match: ["/:mediaType/:id/season/:season"], to: "seasons" },
                      { label: "Credits", to: "credits" },
                      { label: "Trailers", to: "trailers" },
                      { label: "Reviews", to: "reviews" },
                    ]
              }
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};
