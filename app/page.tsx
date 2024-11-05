"use client";

import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import { useTitles } from "@/contexts/TitlesProvider";

export default function Page() {
  const { titles } = useTitles();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <SearchBar />
        <MovieGrid titles={titles}/>
      </div>
    </>
  );
}
