import React from 'react';
import MovieTile from './MovieTile';

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

type MovieGridProps = {
  titles: Title[];
};

const MovieGrid: React.FC<MovieGridProps> = ({ titles }) => {
  return (
    <div className="grid grid-cols-3 gap-32">
      {titles.map((title) => (
        <MovieTile key={title.id} title={title} />
      ))}
    </div>
  );
};

export default MovieGrid;