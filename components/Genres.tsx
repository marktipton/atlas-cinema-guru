"use client";

import React, { useEffect, useState } from 'react';

type GenresProps = {
  onChange: (selectedGenres: string[]) => void; // Define onChange prop
};

const Genres: React.FC<GenresProps> = ({ onChange }) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch('/api/genres'); // Fetch from your API
      const data = await response.json();
      setGenres(data.genres); // Assuming the response has { genres: [...] }
    };

    fetchGenres();
  }, []);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevSelectedGenres) => {
      const newSelectedGenres = new Set(prevSelectedGenres);
      if (newSelectedGenres.has(genre)) {
        newSelectedGenres.delete(genre);
      } else {
        newSelectedGenres.add(genre);
      }
      return newSelectedGenres;
    });
  };

  // Notify parent of selected genres whenever they change
  useEffect(() => {
    onChange(Array.from(selectedGenres)); // Convert Set to Array for easier handling
  }, [selectedGenres, onChange]);

  return (
    <div>
      <div>Genres</div>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <div
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`cursor-pointer border rounded-full px-2 py-1 ${
              selectedGenres.has(genre)
                ? 'bg-teal text-blue border-teal' // Selected styles
                : 'border-teal text-white'  // Default styles
            }`}
          >
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;