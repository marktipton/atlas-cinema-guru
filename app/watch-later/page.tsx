"use client";

import MovieGrid from "@/components/MovieGrid";

export default function WatchLater() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold my-8">
        Watch Later
      </h1>
      <MovieGrid/>
    </div>
  );
}