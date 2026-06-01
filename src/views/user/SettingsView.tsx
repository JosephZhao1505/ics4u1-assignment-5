import { useState } from "react";
import { Button } from "@/components";
import { MOVIE_GENRES, TV_GENRES } from "@/core";
import { useUserContext } from "@/hooks";

export const SettingsView = () => {
  const { userName, setUserName, preferredGenres, setPreferredGenres } = useUserContext();
  const [value, setValue] = useState(userName);
  const [selectedMovieGenres, setSelectedMovieGenres] = useState(new Set(preferredGenres.movies));
  const [selectedTvGenres, setSelectedTvGenres] = useState(new Set(preferredGenres.tvs));
  const [message, setMessage] = useState<{ text: string; color: string } | null>(null);

  const handleMovieGenreChange = (genreId: number) => {
    const updated = new Set(selectedMovieGenres);
    if (updated.has(genreId)) {
      updated.delete(genreId);
    } else {
      updated.add(genreId);
    }
    setSelectedMovieGenres(updated);
    setPreferredGenres({
      movies: Array.from(updated),
      tvs: Array.from(selectedTvGenres),
    });
  };

  const handleTvGenreChange = (genreId: number) => {
    const updated = new Set(selectedTvGenres);
    if (updated.has(genreId)) {
      updated.delete(genreId);
    } else {
      updated.add(genreId);
    }
    setSelectedTvGenres(updated);
    setPreferredGenres({
      movies: Array.from(selectedMovieGenres),
      tvs: Array.from(updated),
    });
  };

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Settings</h1>
      <div className="max-w-md space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
        <div>
          <h2 className="font-semibold text-lg">Profile</h2>
          <p className="text-gray-400 text-sm">Update your profile</p>
        </div>
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Username</label>
          <input
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => {
              setValue(event.target.value);
              setMessage(null);
            }}
            placeholder="Enter your name"
            type="text"
            value={value}
          />
          {message && <p className={`text-sm ${message.color}`}>{message.text}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setValue(userName)} variant="caution">
            Reset
          </Button>
          <Button
            onClick={() => {
              const trimmed = value.trim();

              if (!trimmed) {
                setMessage({ color: "text-red-500", text: "Username cannot be empty" });
                return;
              } else if (value.length > 20) {
                setMessage({ color: "text-red-500", text: "Username too long" });
              } else {
                setUserName(trimmed);
                setMessage({ color: "text-green-500", text: "Username updated successfully" });
              }
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="max-w-2xl space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
        <div>
          <h2 className="font-semibold text-lg">Genres</h2>
          <p className="text-gray-400 text-sm">Select your preferred preferences</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="mb-3 font-semibold text-md">Movies</h3>
            <div className="space-y-2">
              {MOVIE_GENRES.map((genre) => (
                <label className="flex items-center gap-2" key={genre.id} style={{ cursor: "pointer" }}>
                  <input
                    checked={selectedMovieGenres.has(genre.id)}
                    className="rounded"
                    onChange={() => handleMovieGenreChange(genre.id)}
                    type="checkbox"
                  />
                  <span className="text-gray-300">{genre.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-md">TV</h3>
            <div className="space-y-2">
              {TV_GENRES.map((genre) => (
                <label className="flex items-center gap-2" key={genre.id} style={{ cursor: "pointer" }}>
                  <input
                    checked={selectedTvGenres.has(genre.id)}
                    className="rounded"
                    onChange={() => handleTvGenreChange(genre.id)}
                    type="checkbox"
                  />
                  <span className="text-gray-300">{genre.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
