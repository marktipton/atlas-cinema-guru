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
    <div className="max-w-xs bg-searchBlue shadow-lg rounded-lg overflow-hidden outline outline-2 outline-teal">
      <img
        src={title.image}
        alt={title.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title.title} ({title.released})</h2>
        <p className="text-white text-sm mb-2">{title.synopsis}</p>
        <span className="inline-block bg-teal text-white text-xs py-2 px-2 rounded-full">
          {title.genre}
        </span>
      </div>
    </div>
  );
};

export default MovieTile;