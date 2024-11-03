"use client";

import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();


  if (!session) {
    return <div>Hello Cinema Guru, please sign in</div>
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <SearchBar />
        <MovieGrid />
      </div>
    </>
  );
}
