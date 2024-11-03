"use client";

import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import Pagination from "@/components/Pagination";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <SearchBar />
        <MovieGrid />
        <Pagination />
      </div>
    </>
  );
}
