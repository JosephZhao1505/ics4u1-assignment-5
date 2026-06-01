import type { ReactNode } from "react";
import { UserContext } from "@/context";
import { CART_KEY, FAVORITES_KEY, GENRES_KEY, type GenrePreferences, type ImageCell, USERNAME_KEY } from "@/core";
import { useLocalStorage } from "@/hooks";

type UserProviderProps = {
  children: ReactNode;
};

const defaultPreferredGenres: GenrePreferences = {
  movies: [],
  tvs: [],
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string>(USERNAME_KEY, "User");
  const [favoritesStorage, setFavoritesStorage] = useLocalStorage<[number, ImageCell][]>(FAVORITES_KEY, []);
  const [cartStorage, setCartStorage] = useLocalStorage<[number, ImageCell][]>(CART_KEY, []);
  const [preferredGenresStorage, setPreferredGenresStorage] = useLocalStorage<GenrePreferences, GenrePreferences>(
    GENRES_KEY,
    defaultPreferredGenres,
    {
      deserialize: (stored) => {
        if (!stored || typeof stored !== "object") {
          return defaultPreferredGenres;
        }

        const parsed = stored as Partial<GenrePreferences>;
        const movies = Array.isArray(parsed.movies) ? parsed.movies.filter((id): id is number => typeof id === "number") : [];
        const tvs = Array.isArray(parsed.tvs) ? parsed.tvs.filter((id): id is number => typeof id === "number") : [];

        return { movies, tvs };
      },
      serialize: (value) => value,
    },
  );

  const favorites = new Map(favoritesStorage);
  const cart = new Map(cartStorage);
  const preferredGenres = preferredGenresStorage;

  const toggleFavorite = (item: ImageCell) => {
    const map = new Map(favorites);

    if (map.has(item.id)) {
      map.delete(item.id);
    } else {
      map.set(item.id, item);
    }

    setFavoritesStorage(Array.from(map.entries()));
  };

  const toggleCart = (item: ImageCell) => {
    const map = new Map(cartStorage);

    if (map.has(item.id)) {
      map.delete(item.id);
    } else {
      map.set(item.id, item);
    }

    setCartStorage(Array.from(map.entries()));
  };

  return (
    <UserContext.Provider
      value={{
        cart,
        favorites,
        preferredGenres,
        setPreferredGenres: setPreferredGenresStorage,
        setUserName,
        toggleCart,
        toggleFavorite,
        userName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
