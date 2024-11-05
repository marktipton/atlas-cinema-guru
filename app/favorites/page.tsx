"use client";

import React from 'react';
import MovieGrid from "@/components/MovieGrid";
import { useTitles } from '@/contexts/TitlesProvider';

export default function Favorites() {
  const { titles } = useTitles(); // Access all titles from the TitlesProvider

  // Filter titles to only include those that are favorited
  const favorites = titles.filter((title) => title.favorited);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-8">
        Favorites
      </h1>
      <MovieGrid titles={favorites} /> {/* Pass filtered favorites to MovieGrid */}
    </div>
  );
}