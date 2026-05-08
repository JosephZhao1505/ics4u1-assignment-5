import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import {
  CareerView,
  CreditsView,
  EpisodeView,
  ErrorView,
  GenreView,
  HomeView,
  ImagesView,
  LandingPageView,
  MovieListsView,
  MovieView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  TelevisionListsView,
  TrailersView,
  TrendingView,
} from "@/views";

export const App = () => {
  return (
    <Routes>
      <Route element={<LandingPageView />} path="/" />
      <Route element={<MainLayout />}>
        <Route element={<HomeView />} path="/home" />
        <Route element={<MovieListsView />} path="/movies/:listType" />
        <Route element={<TelevisionListsView />} path="/tv/:listType" />
        <Route element={<TrendingView />} path="/trending/:mediaType" />
        <Route element={<GenreView />} path="/genre/:mediaType/:genre" />
        <Route element={<SearchView />} path="/search" />
        <Route element={<MovieView />} path="/:mediaType/:id">
          <Route element={<CreditsView />} path="credits" />
          <Route element={<ReviewsView />} path="reviews" />
          <Route element={<TrailersView />} path="trailers" />
          <Route element={<SeasonsView />} path="seasons" />
          <Route element={<EpisodeView />} path="season/:seasonNumber" />
        </Route>
        <Route element={<PersonView />} path="/person/:id">
          <Route element={<CareerView />} path="career" />
          <Route element={<ImagesView />} path="images" />
        </Route>
      </Route>
      <Route element={<ErrorView />} path="*" />
    </Routes>
  );
};
