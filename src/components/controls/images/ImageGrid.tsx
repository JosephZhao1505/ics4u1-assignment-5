import { IMAGE_BASE_URL } from '@/core/constants/images';

type ImageGridProps = {
  results: Array<{
    id: number;
    imagePath: string | null;
    primaryText: string;
    secondaryText?: string;
  }>;
  onClick?: (id: number) => void;
};

export const ImageGrid = ({ results, onClick }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {results.map((result) => (
        <div key={result.id} onClick={() => onClick?.(result.id)} className="group flex cursor-pointer flex-col gap-3">
          <div className="relative aspect-2/3 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            {result.imagePath ? (
              <img
                src={`${IMAGE_BASE_URL}${result.imagePath}`}
                alt={result.primaryText}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-slate-700">
                No Image Available
              </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <div className="flex flex-col">
            <p className="truncate font-semibold text-slate-200 transition-colors group-hover:text-white">{result.primaryText}</p>
            {result.secondaryText && <p className="truncate text-sm font-medium text-slate-500">{result.secondaryText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
