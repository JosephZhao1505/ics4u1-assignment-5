import type { ReactNode } from "react";
import type { ImageCell } from "@/core";

type ImageGridProps = {
  images: ImageCell[];
  onClick?: (image: ImageCell) => void;
  children?: (image: ImageCell) => ReactNode;
};

export const ImageGrid = ({ images, onClick, children }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {images.map((image) => (
        <div className={`group flex flex-col gap-3 ${onClick ? "cursor-pointer" : ""}`} key={image.id} onClick={() => onClick?.(image)}>
          <div className="relative aspect-2/3 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            {children?.(image)}

            <img
              alt={image.primaryText}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={image.imageUrl}
            />

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {(image.primaryText || image.secondaryText) && (
            <div className="flex flex-col">
              {image.primaryText && (
                <p className="truncate font-semibold text-slate-200 transition-colors group-hover:text-white">{image.primaryText}</p>
              )}
              {image.secondaryText && <p className="truncate font-medium text-slate-500 text-sm">{image.secondaryText}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
