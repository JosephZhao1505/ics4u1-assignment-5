export type SearchType = 'movie' | 'tv' | 'person';

export type Media = 'movie' | 'tv';

export type ImageCell = {
  id: number;
  imageUrl: string;
  primaryText?: string;
  secondaryText?: string;
  showId?: number;
  seasonId?: number;
  season?: number;
  media?: Media;
};

export type MoviesResponse = {
  results: Array<{
    id: number;
    original_title: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type TvsResponse = {
  results: Array<{
    id: number;
    name: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type MediaResponse = {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  title?: string;
  release_date?: string;
  name?: string;
  first_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  seasons?: Array<{
    id: number;
    name: string;
    air_date?: string;
    poster_path: string;
    season_number: number;
  }>;
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
    profile_path: string | null;
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
