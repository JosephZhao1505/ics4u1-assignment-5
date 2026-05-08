import { MainLayout } from '@/layouts/MainLayout';
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
} from '@/views';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPageView />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomeView />} />
        <Route path="/movies/:listType" element={<MovieListsView />} />
        <Route path="/tv/:listType" element={<TelevisionListsView />} />
        <Route path="/trending/:mediaType" element={<TrendingView />} />
        <Route path="/genre/:mediaType/:genre" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/:mediaType/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="seasons" element={<SeasonsView />} />
          <Route path="season/:seasonNumber" element={<EpisodeView />} />
        </Route>
        <Route path="/person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
