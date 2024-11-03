"use client";

import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <SearchBar />
        <MovieGrid />
      </div>
    </>
  );
}
