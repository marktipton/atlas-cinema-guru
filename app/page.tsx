"use client";

import SearchBar from "@/components/SearchBar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Title = {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  favorited: boolean;
  watchLater: boolean;
  image: string;
};

export default function Page() {
  const { data: session } = useSession();
  const [titles, setTitles] = useState<Title[]>([]);

  useEffect(() => {
    if (session) {
      fetch('/api/titles', {
        headers: {
          Authorization: `Bearer ${session.user?.id}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setTitles(data.title))
        .catch((error) => console.error("Error fetching titles:", error));
    }
  }, [session]);

  if (!session) {
    return <div>Hello Cinema Guru, please sign in</div>
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <SearchBar />
        {/* <div>
          <h1>{`Hello ${session.user?.name}`}</h1>
        </div> */}
        <div className="grid grid-cols-3 gap-6">
          {titles.map((title) => (
            <div key={title.id} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={title.image} alt={title.title} className="w-full h-48 object-cover outline outline-2 outline-teal" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{title.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{title.synopsis}</p>
                <p className="text-gray-500 text-xs">{title.genre} | {title.released}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
