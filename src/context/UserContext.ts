import { createContext } from "react";
import type { GenrePreferences, ImageCell } from "@/core";

export type UserContextType = {
  userName: string;
  favorites: Map<number, ImageCell>;
  cart: Map<number, ImageCell>;
  preferredGenres: GenrePreferences;
  setUserName: (userName: string) => void;
  toggleFavorite: (item: ImageCell) => void;
  toggleCart: (item: ImageCell) => void;
  setPreferredGenres: (genres: GenrePreferences) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
