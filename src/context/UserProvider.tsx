import type { ReactNode } from "react";
import { UserContext } from "@/context";
import { CART_KEY, FAVORITES_KEY, GENRES_KEY, type GenrePreferences, type ImageCell, USERNAME_KEY } from "@/core";
import { useLocalStorage } from "@/hooks";

type UserProviderProps = {
  children: ReactNode;
};

const genres: GenrePreferences = {
  movies: [],
  tvs: [],
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string>(USERNAME_KEY, "User");
  const [favoriteStorage, setFavoriteStorage] = useLocalStorage<[number, ImageCell][]>(FAVORITES_KEY, []);
  const [cartStorage, setCartStorage] = useLocalStorage<[number, ImageCell][]>(CART_KEY, []);
  const [preferredGenres, setPreferredGenres] = useLocalStorage<GenrePreferences, GenrePreferences>(GENRES_KEY, genres, {
    deserialize: (stored) => {
      if (!stored || typeof stored !== "object") {
        return genres;
      }

      const parsed = stored as Partial<GenrePreferences>;
      const movies = Array.isArray(parsed.movies) ? parsed.movies.filter((id): id is number => typeof id === "number") : [];
      const tvs = Array.isArray(parsed.tvs) ? parsed.tvs.filter((id): id is number => typeof id === "number") : [];

      return { movies, tvs };
    },
    serialize: (value) => value,
  });

  const favorites = new Map(favoriteStorage);
  const cart = new Map(cartStorage);

  const toggleFavorite = (item: ImageCell) => {
    const map = new Map(favorites);
    const cartMap = new Map(cart);

    if (map.has(item.id)) {
      map.delete(item.id);
    } else {
      map.set(item.id, item);
      // Remove from cart if adding to favorites
      cartMap.delete(item.id);
      setCartStorage(Array.from(cartMap.entries()));
    }

    setFavoriteStorage(Array.from(map.entries()));
  };

  const toggleCart = (item: ImageCell) => {
    const map = new Map(cart);
    const favoriteMap = new Map(favorites);

    if (map.has(item.id)) {
      map.delete(item.id);
    } else {
      map.set(item.id, item);
      // Remove from favorites if adding to cart
      favoriteMap.delete(item.id);
      setFavoriteStorage(Array.from(favoriteMap.entries()));
    }

    setCartStorage(Array.from(map.entries()));
  };

  const clearFavorites = () => {
    setFavoriteStorage([]);
  };

  const clearCart = () => {
    setCartStorage([]);
  };

  return (
    <UserContext.Provider
      value={{
        cart,
        clearCart,
        clearFavorites,
        favorites,
        preferredGenres,
        setPreferredGenres: setPreferredGenres,
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
