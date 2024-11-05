"use client";

import React from 'react';
import MovieGrid from "@/components/MovieGrid";
import { useTitles } from '@/contexts/TitlesProvider';

export default function WatchLater() {
  const { titles } = useTitles(); // Access all titles from TitlesProvider

  // Filter titles to only include those marked for watch later
  const watchLaterMovies = titles.filter((title) => title.watchLater);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-8">Watch Later</h1>
      <MovieGrid titles={watchLaterMovies} /> {/* Pass filtered watch later movies to MovieGrid */}
    </div>
  );
}