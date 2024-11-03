import React from 'react';

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

type MovieTileProps = {
  title: Title;
};

const MovieTile: React.FC<MovieTileProps> = ({ title }) => {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={title.image}
        alt={title.title}
        className="w-full h-48 object-cover outline outline-2 outline-teal"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title.title}</h2>
        <p className="text-gray-600 text-sm mb-2">{title.synopsis}</p>
        <p className="text-gray-500 text-xs">
          {title.genre} | {title.released}
        </p>
      </div>
    </div>
  );
};

export default MovieTile;