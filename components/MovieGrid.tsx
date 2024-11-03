import React from 'react';
import { useTitles } from '@/contexts/TitlesContext';
import MovieTile from './MovieTile';

const MovieGrid: React.FC = () => {
  const { titles } = useTitles();

  return (
    <div className="grid grid-cols-3 gap-6">
      {titles.map((title) => (
        <MovieTile key={title.id} title={title} />
      ))}
    </div>
  );
};

export default MovieGrid;