import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, LinkGroup, SearchBar } from "@/components";
import { useUserContext } from "@/hooks";

export const Header = () => {
  const navigate = useNavigate();
  const { userName } = useUserContext();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("movie");

  return (
    <header className="sticky top-0 z-50 border-slate-800 border-b bg-slate-950/80 backdrop-blur-md">
      <nav className="flex h-16 w-full items-center gap-8 px-6">
        <h1 className="shrink-0 cursor-pointer font-black text-indigo-500 text-xl tracking-tighter" onClick={() => navigate("/home")}>
          BrokeFlix+
        </h1>
        <h1 className="shrink-0 font-black text-xm tracking-tighter">Hello {userName}!</h1>

        <div className="hidden lg:block">
          <LinkGroup
            options={[
              { label: "Home", to: "/home" },
              { label: "Movies", match: ["/movies/:listType"], to: "/movies/now-playing" },
              { label: "TV", match: ["/tv/:listType"], to: "/tv/airing-today" },
              { label: "Trending", match: ["/trending/:mediaType"], to: "/trending/movie?interval=day" },
              { label: "Genre", match: ["/genre/:mediaType/:genre"], to: "/genre/movie/action" },
            ]}
          />
        </div>

        <div className="flex w-full max-w-xl flex-1 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 py-1 pr-1 pl-4 transition-all focus-within:border-indigo-500/50">
          <SearchBar
            onChange={(input) => {
              setQuery(input);
              navigate(`/search?q=${input}&type=${type}`);
            }}
            value={query}
          />

          <div className="mx-1 h-4 w-px bg-slate-700" />

          <ButtonGroup
            onClick={(val) => {
              setType(val);
              query && navigate(`/search?q=${query}&type=${val}`);
            }}
            options={[
              { label: "Movies", value: "movie" },
              { label: "TV", value: "tv" },
              { label: "People", value: "person" },
            ]}
            value={type}
          />
        </div>

        <div className="ml-auto hidden lg:block">
          <LinkGroup
            options={[
              { label: "Favorites", match: ["/favorites/:mediaType"], to: "/favorites/movie" },
              { label: "Cart", to: "/cart" },
              { label: "Settings", to: "/settings" },
            ]}
          />
        </div>
      </nav>
    </header>
  );
};