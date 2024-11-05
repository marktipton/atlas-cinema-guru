"use client";

import React, { useEffect } from 'react';
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import { useTitles } from "@/contexts/TitlesProvider";
import Pagination from "@/components/Pagination";
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();
  const { titles, currentPage, hasMore, setPage } = useTitles();

  useEffect(() => {
    if (session) {
      setPage(currentPage);  // This will trigger fetching the current page in TitlesProvider
    }
  }, [session, currentPage, setPage]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <SearchBar />
      <MovieGrid
        titles={titles}
      />
      <Pagination
        currentPage={currentPage}
        hasMore={hasMore}
        onPageChange={setPage}  // Update the page directly via TitlesProvider
      />
    </div>
  );
}