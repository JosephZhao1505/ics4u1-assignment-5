import { Button, LinkGroup } from '@/components';
import type { PersonResponse } from '@/core';
import { IMAGE_BASE_URL, PERSON_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { FaBirthdayCake, FaChevronLeft, FaLocationArrow } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {});

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        <p className="animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 pb-20 text-slate-200">
      <div className="container mx-auto px-4 pt-8">
        <div className="mb-8">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <div className="flex items-center gap-2">
              <FaChevronLeft className="h-3 w-3" />
              <span>Back</span>
            </div>
          </Button>
        </div>

        <div className="flex flex-col gap-12 md:flex-row">
          <aside className="w-full shrink-0 md:w-1/3 lg:w-1/4">
            <div className="sticky top-24">
              <div className="mb-6 overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
                <img src={`${IMAGE_BASE_URL}${data.profile_path}`} alt={data.name} className="h-auto w-full object-cover" />
              </div>

              <div className="space-y-4 px-2">
                <div className="flex items-center gap-3 text-slate-400">
                  <FaLocationArrow className="shrink-0 text-indigo-500" />
                  <span className="text-sm leading-relaxed">{data.place_of_birth}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <FaBirthdayCake className="shrink-0 text-indigo-500" />
                  <span className="text-sm">{data.birthday}</span>
                </div>
              </div>
            </div>
          </aside>

          <section className="min-w-0 flex-1">
            <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl">{data.name}</h1>

            <div className="mb-10">
              <h2 className="mb-3 text-lg font-bold tracking-widest text-indigo-400 uppercase">Biography</h2>
              <p className="max-w-3xl text-lg leading-relaxed whitespace-pre-line text-slate-400">
                {data.biography || 'No biography available for this person.'}
              </p>
            </div>

            <div className="mb-8 border-b border-slate-800">
              <LinkGroup
                options={[
                  { label: 'Career', to: 'career' },
                  { label: 'Images', to: 'images' },
                ]}
              />
            </div>

            <div className="mt-8">
              <Outlet />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
