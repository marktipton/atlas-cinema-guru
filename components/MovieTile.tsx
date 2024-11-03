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
    <div className="max-w-md rounded-lg overflow-hidden outline outline-2 outline-teal relative group h-5/6">
      <img
        src={title.image}
        alt={title.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-searchBlue p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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