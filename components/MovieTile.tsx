import React from 'react';
import { ClockIcon , StarIcon } from "@heroicons/react/24/solid"
import { ClockIcon as ClockIconOutline , StarIcon as StarIconOutline} from "@heroicons/react/24/outline"
import { useTitles } from '@/contexts/TitlesProvider';

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
  const { toggleFavorite, toggleWatchLater } = useTitles();
  return (
    <div className="max-w-sm rounded-lg overflow-hidden outline outline-2 outline-teal relative group">
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
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className="text-white rounded-full w-6 h-6"
          onClick={() => toggleFavorite(title.id)}
        >
          {title.favorited ? <StarIcon /> : <StarIconOutline />}
        </button>
        <button
          className="text-white rounded-full w-6 h-6"
          onClick={() => toggleWatchLater(title.id)}
        >
          {title.watchLater ? <ClockIcon /> : <ClockIconOutline />}
        </button>
      </div>
    </div>
  );
};

export default MovieTile;