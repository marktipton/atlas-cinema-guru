"use client";

import React, { useEffect, useState } from 'react';
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import { useTitles } from "@/contexts/TitlesProvider";
import Pagination from "@/components/Pagination";
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();
  const { titles, setTitles } = useTitles();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch titles when the component mounts or currentPage changes
  useEffect(() => {
    if (session) {
      fetch(`/api/titles?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${session.user?.id}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTitles(data.title);
          setTotalPages(data.totalPages); // Assuming your API returns this
        })
        .catch((error) => console.error("Error fetching titles:", error));
    }
  }, [session, currentPage, setTitles]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <SearchBar />
      <MovieGrid
        titles={titles}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}