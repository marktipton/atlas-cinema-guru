"use client";

import MovieGrid from "@/components/MovieGrid";
import { WatchLaterProvider, useWatchLater } from "@/contexts/WatchLaterProvider"; // Import context and provider

export default function WatchLater() {
  return (
    <WatchLaterProvider>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-8">Watch Later</h1>
        <WatchLaterMovies />
      </div>
    </WatchLaterProvider>
  );
}

const WatchLaterMovies: React.FC = () => {
  const { watchLater } = useWatchLater();

  return <MovieGrid titles={watchLater} />;
};