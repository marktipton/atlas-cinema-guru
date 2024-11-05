"use client";

import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import { useTitles } from "@/contexts/TitlesProvider";
import Pagination from "@/components/Pagination";

export default function Page() {
  const { titles, currentPage, totalPages, setCurrentPage } = useTitles();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <SearchBar />
        <MovieGrid
          titles={titles}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
