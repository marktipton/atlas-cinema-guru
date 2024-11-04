"use client";

import React, { useEffect, useState } from 'react';

const Genres: React.FC = () => {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch('/api/genres'); // Fetch from your API
      const data = await response.json();
      setGenres(data.genres); // Assuming the response has { genres: [...] }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <div>Genres</div>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <div key={genre} className="border border-teal rounded-full px-4 py-1 text-white">
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;