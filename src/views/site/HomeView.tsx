import { HiFilm, HiFire } from "react-icons/hi";
import { HiRectangleGroup, HiTv } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components";

export const HomeView = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <HiFilm className="h-10 w-10" />, label: "Movies", path: "/movies/now-playing" },
    { icon: <HiTv className="h-10 w-10" />, label: "TV", path: "/tv/airing-today" },
    { icon: <HiFire className="h-10 w-10" />, label: "Trending", path: "/trending/movie?interval=day" },
    { icon: <HiRectangleGroup className="h-10 w-10" />, label: "Genres", path: "/genre/movie/action" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0f172a]">
      <main className="flex grow items-center justify-center p-6">
        <section className="grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          {menuItems.map((item) => (
            <button
              className="group relative flex h-56 cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 transition-all duration-500 hover:border-indigo-500/50 hover:bg-slate-800 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]"
              key={item.label}
              onClick={() => navigate(item.path)}
            >
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="rounded-2xl bg-slate-800 p-5 text-slate-400 transition-all duration-300 group-hover:scale-110 group-hover:text-indigo-400">
                {item.icon}
              </div>

              <span className="font-bold text-2xl text-slate-300 tracking-tight group-hover:text-white">{item.label}</span>
            </button>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};
