import React from 'react';
import { useTitles } from '@/contexts/TitlesProvider';
import MovieTile from './MovieTile';

const MovieGrid: React.FC = () => {
  const { titles } = useTitles();

  return (
    <div className="grid grid-cols-3 gap-32">
      {titles.map((title) => (
        <MovieTile key={title.id} title={title} />
      ))}
    </div>
  );
};

export default MovieGrid;