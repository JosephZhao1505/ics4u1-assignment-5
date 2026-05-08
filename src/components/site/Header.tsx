import { ButtonGroup, LinkGroup, SearchBar } from '@/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<string>('movie');

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center gap-8 px-4">
        <h1 className="shrink-0 cursor-pointer text-xl font-black tracking-tighter text-indigo-500" onClick={() => navigate('/home')}>
          BrokeFlix+
        </h1>

        <div className="hidden flex-1 lg:block">
          <LinkGroup
            options={[
              { label: 'Home', to: '/home' },
              { label: 'Movies', to: '/movies/now-playing', match: ['/movies/:listType'] },
              { label: 'TV', to: '/tv/airing-today', match: ['/tv/:listType'] },
              { label: 'Trending', to: '/trending/movie?interval=day', match: ['/trending/:mediaType'] },
              { label: 'Genre', to: '/genre/movie/action', match: ['/genre/:mediaType/:genre'] },
            ]}
          />
        </div>

        <div className="ml-auto flex w-full max-w-sm items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 py-1 pr-1 pl-4 transition-all focus-within:border-indigo-500/50">
          <SearchBar
            value={query}
            onChange={(input) => {
              setQuery(input);
              navigate(`/search?q=${input}&type=${type}`);
            }}
          />

          <div className="mx-1 h-4 w-px bg-slate-700" />

          <ButtonGroup
            value={type}
            options={[
              { label: 'Movies', value: 'movie' },
              { label: 'TV', value: 'tv' },
              { label: 'People', value: 'person' },
            ]}
            onClick={(val) => {
              setType(val);
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              query && navigate(`/search?q=${query}&type=${val}`);
            }}
          />
        </div>
      </nav>
    </header>
  );
};
