import type { ReactNode } from "react";

export type SearchType = "movie" | "tv" | "person";

export type Media = "movie" | "tv";

export type ImageCell = {
  id: number;
  imageUrl: string;
  primaryText?: string;
  secondaryText?: string;
  media?: Media;
};

export type ImageAction = {
  id: string;
  icon: (active: boolean) => ReactNode;
  active: (image: ImageCell) => boolean;
  onClick: (image: ImageCell) => void;
  position: "left" | "right";
};

export type MediaItem = {
  id: number;
  poster_path: string;
  original_title?: string;
  name?: string;
};

export type MediaResponse = {
  id: number;
  results: MediaItem[];
  title?: string; // Movies
  name?: string; // TV Shows
  poster_path: string;
  backdrop_path: string;
  overview: string;
  tagline?: string;
  genres: Array<{ id: number; name: string }>;
  vote_average: number;
  vote_count: number;
  status: string;

  // Movie specific
  release_date?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;

  // TV specific
  first_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];

  seasons?: Array<{
    id: number;
    name: string;
    air_date?: string;
    poster_path: string;
    season_number: number;
  }>;
  total_pages: number;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

export type SeasonsResponse = {
  name: string;
  season_number: number;
  air_date?: string;
  overview: string;
  episodes: Array<{
    id: number;
    name: string;
    air_date: string;
    still_path: string;
  }>;
};

export type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string;
    character: string;
  }>;
};

export type ReviewsResponse = {
  results: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

export type TrailersResponse = {
  results: Array<{
    key: string;
    name: string;
    site: string;
    type: string;
  }>;
};

export type SearchResponse = {
  results: Array<{
    original_title: string | undefined;
    id: number;
    name?: string;
    title?: string;
    profile_path?: string;
    poster_path?: string;
  }>;
  total_pages: number;
  total_results: number;
};

export type PersonResponse = {
  id: number;
  name: string;
  profile_path: string; // main image
  place_of_birth: string;
  birthday: string;
  biography: string;
};

export type PersonImagesResponse = {
  profiles: Array<{
    id: number;
    file_path: string;
  }>;
};

export type PersonCareerResponse = {
  cast: Array<{
    id: number;
    title: string;
    character: string;
    poster_path: string;
  }>;
};
