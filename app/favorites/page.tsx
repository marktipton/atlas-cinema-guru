"use client";

import { FavoritesProvider, useFavorites } from "@/contexts/FavoritesProvider";
import MovieGrid from "@/components/MovieGrid";

function FavoritesContent() {
  const { favorites } = useFavorites();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-8">
        Favorites
      </h1>
      <MovieGrid titles={favorites} />
    </div>
  );
}

export default function Favorites() {
  return (
    <FavoritesProvider>
      <FavoritesContent />
    </FavoritesProvider>
  );
}