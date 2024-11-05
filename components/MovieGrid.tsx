import React from 'react';
import MovieTile from './MovieTile';
import Pagination from './Pagination'; // Import the Pagination component

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
  currentPage: number;      // Add currentPage prop
  totalPages: number;       // Add totalPages prop
  onPageChange: (page: number) => void; // Add onPageChange prop
};

const MovieGrid: React.FC<MovieGridProps> = ({ titles, currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-32">
        {titles.map((title) => (
          <MovieTile key={title.id} title={title} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default MovieGrid;