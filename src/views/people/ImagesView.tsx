import { ImageGrid } from '@/components';
import type { PersonImagesResponse } from '@/core';
import { PERSON_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<PersonImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {});

  const gridData = (data?.profiles ?? []).map((result) => ({
    id: result.id,
    imagePath: result.file_path,
    primaryText: '',
    secondaryText: '',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <h2 className="mb-6 text-2xl font-bold">Images</h2>
      {data.profiles.length ? <ImageGrid results={gridData} /> : <p className="text-center text-gray-400">No images available.</p>}
    </section>
  );
};
