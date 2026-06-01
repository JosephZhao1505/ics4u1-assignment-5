import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, LinkGroup, Modal } from "@/components";
import type { ImageCell, MediaResponse } from "@/core";
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL, TELEVISION_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const MediaView = () => {
  const navigate = useNavigate();
  const { mediaType, id } = useParams();
  const endpoint = mediaType === "movie" ? `${MOVIE_ENDPOINT}/${id}` : `${TELEVISION_ENDPOINT}/${id}`;
  const { data } = useTmdb<MediaResponse>(endpoint, {});
  const { cart, toggleCart } = useUserContext();
  let priceDisplay = null;

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (data.release_date) {
    const currentYear = new Date().getFullYear();
    const releaseDate = new Date(data.release_date).getFullYear();
    const mediaAge = currentYear - releaseDate;

    const basePrice = 19.99;
    const floorPrice = 4.99;

    const finalPrice = basePrice - mediaAge;

    priceDisplay = Math.max(finalPrice, floorPrice);
  }

  const mediaCell: ImageCell = {
    id: data.id,
    imageUrl: `${IMAGE_BASE_URL}${data.poster_path}`,
    media: mediaType as "movie" | "tv",
    price: priceDisplay ?? undefined,
    primaryText: data.title ?? data.name,
  };

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

          <div className="flex flex-1 flex-col">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h1 className="font-bold text-3xl">{data.title ?? data.name}</h1>
                <h2 className="mt-1 shrink-0 cursor-pointer font-black text-indigo-500 text-xm tracking-tighter">{data.tagline}</h2>
              </div>

              <div className="flex shrink-0 flex-col items-end">
                {!priceDisplay ? "" : <p className="mb-2 font-bold text-3xl">${priceDisplay.toFixed(2)}</p>}
                {mediaType === "movie" && (
                  <Button onClick={() => toggleCart(mediaCell)}>{cart.has(mediaCell.id) ? "Remove from cart" : "Add to cart"}</Button>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <LinkGroup
                options={
                  mediaType === "movie"
                    ? [
                        { label: "Summary", to: "summary" },
                        { label: "Credits", to: "credits" },
                        { label: "Trailers", to: "trailers" },
                        { label: "Reviews", to: "reviews" },
                      ]
                    : [
                        { label: "Summary", to: "summary" },
                        { label: "Seasons", match: ["/:mediaType/:id/season/:season"], to: "seasons" },
                        { label: "Credits", to: "credits" },
                        { label: "Trailers", to: "trailers" },
                        { label: "Reviews", to: "reviews" },
                      ]
                }
              />
              <div className="min-h-80 border-gray-800 border-t pt-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
