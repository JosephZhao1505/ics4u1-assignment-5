import { createContext } from "react";
import type { ImageCell } from "@/core";

export type UserContextType = {
  userName: string;
  favorites: Map<number, ImageCell>;
  cart: Map<number, ImageCell>;
  setUserName: (userName: string) => void;
  toggleFavorite: (item: ImageCell) => void;
  toggleCart: (item: ImageCell) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
