"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

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

type TitlesContextType = {
  titles: Title[];
  currentPage: number;
  hasMore: boolean;
  setPage: (page: number) => void;
  toggleFavorite: (id: string) => void;
  toggleWatchLater: (id: string) => void;
  activities: Activity[];
  setQuery: (query: string) => void;
  setMinYear: (year: number) => void;
  setMaxYear: (year: number) => void;
  setGenres: (genres: string[]) => void;
  handleGenreChange: (selectedGenre: string) => void;
};

type Activity = {
  type: 'favorited' | 'unfavorited' | 'watchlater' | 'unwatchlater';
  title: string;
  time: string;
};

const TitlesContext = createContext<TitlesContextType | undefined>(undefined);

export const TitlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [titles, setTitles] = useState<Title[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [query, setQuery] = useState('');
  const [minYear, setMinYear] = useState<number>(1990);
  const [maxYear, setMaxYear] = useState(new Date().getFullYear());
  const [genres, setGenres] = useState<string[]>([]);

  // Fetch paginated titles whenever the session or currentPage changes
  useEffect(() => {
    if (session) {
      const params: any = {
        page: currentPage.toString(),
        minYear: minYear.toString(),
        maxYear: maxYear.toString(),
        query,
      };

      // Only add genres if they are selected (not empty)
      if (genres.length > 0) {
        params.genres = genres.join(',');
      }

      const searchParams = new URLSearchParams(params);
      fetch(`/api/titles?${searchParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${session.user?.id}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTitles(data.title);
          setHasMore(data.title.length > 0);
        })
        .catch((error) => console.error("Error fetching titles:", error));
    }
  }, [session, currentPage, query, minYear, maxYear, genres, setTitles, setHasMore]);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleGenreChange = (selectedGenre: string) => {
    setGenres((prevGenres) => {
      // Reset to page 1 whenever genres are changed
      setCurrentPage(1);

      // Toggle the genre (if already selected, remove it; if not, add it)
      return prevGenres.includes(selectedGenre)
        ? prevGenres.filter((genre) => genre !== selectedGenre)
        : [...prevGenres, selectedGenre];
    });
  };

  const toggleFavorite = useCallback(async (id: string) => {
    setTitles((prevTitles) =>
      prevTitles.map((title) =>
        title.id === id ? { ...title, favorited: !title.favorited } : title
      )
    );

    // Capture the updated title to determine its new favorited state
    const updatedTitle = titles.find((title) => title.id === id);
    if (updatedTitle) {
      try {
        await fetch(`/api/favorites/${id}`, {
          method: updatedTitle.favorited ? "DELETE" : "POST",
        });

        // Add the activity log after updating the favorite status
        setActivities((prevActivities) => [
          ...prevActivities,
          {
            type: updatedTitle.favorited ? 'unfavorited' : 'favorited',
            title: updatedTitle.title,
            time: new Date().toLocaleTimeString(),
          },
        ]);
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    }
  }, [titles]);

  const toggleWatchLater = useCallback(async (id: string) => {
    setTitles((prevTitles) =>
      prevTitles.map((title) =>
        title.id === id ? { ...title, watchLater: !title.watchLater } : title
      )
    );

    const updatedTitle = titles.find((title) => title.id === id);
    if (updatedTitle) {
      try {
        await fetch(`/api/watch-later/${id}`, {
          method: updatedTitle.watchLater ? "DELETE" : "POST",
        });
        setActivities((prevActivities) => [
          ...prevActivities,
          {
            type: updatedTitle.watchLater ? 'unwatchlater' : 'watchlater',
            title: updatedTitle.title,
            time: new Date().toLocaleTimeString(),
          },
        ]);
      } catch (error) {
        console.error("Error updating watch later:", error);
      }
    }
  }, [titles]);

  return (
    <TitlesContext.Provider value={{ titles, currentPage, hasMore, setPage, toggleFavorite, toggleWatchLater, activities, setQuery, setMinYear, setMaxYear, setGenres, handleGenreChange }}>
      {children}
    </TitlesContext.Provider>
  );
};

export const useTitles = () => {
  const context = useContext(TitlesContext);
  if (!context) throw new Error('useTitles must be used within TitlesProvider');
  return context;
};