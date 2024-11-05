"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useFilter } from './FilterProvider';

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
  setTitles: React.Dispatch<React.SetStateAction<Title[]>>;
  toggleFavorite: (id: string) => void;
  toggleWatchLater: (id: string) => void;
};

const TitlesContext = createContext<TitlesContextType | undefined>(undefined);

export const TitlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [titles, setTitles] = useState<Title[]>([]);
  const { filter } = useFilter();

  useEffect(() => {
    if (session) {
      fetch('/api/titles', {
        headers: {
          Authorization: `Bearer ${session.user?.id}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setTitles(data.title))
        .catch((error) => console.error("Error fetching titles:", error));
    }
  }, [session]);

  const toggleFavorite = async (id: string) => {
    setTitles((prevTitles) =>
      prevTitles.map((title) =>
        title.id === id ? { ...title, favorited: !title.favorited } : title
      )
    );

    try {
      const updatedTitle = titles.find((title) => title.id === id);

      if (updatedTitle && updatedTitle.favorited) {
        await fetch(`/api/favorites/${id}`, { method: "DELETE" });
      } else {
        await fetch(`/api/favorites/${id}`, { method: "POST" });
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const toggleWatchLater = async (id: string) => {
    setTitles((prevTitles) =>
      prevTitles.map((title) =>
        title.id === id ? { ...title, watchLater: !title.watchLater } : title
      )
    );

    try {
      const updatedTitle = titles.find((title) => title.id === id);

      if (updatedTitle && updatedTitle.watchLater) {
        await fetch(`/api/watch-later/${id}`, { method: "DELETE" });
      } else {
        await fetch(`/api/watch-later/${id}`, { method: "POST" });
      }
    } catch (error) {
      console.error("Error updating watch later:", error);
    }
  };

  return (
    <TitlesContext.Provider value={{
      titles,
      setTitles,
      toggleFavorite,
      toggleWatchLater,
    }}>
      {children}
    </TitlesContext.Provider>
  );
};

export const useTitles = () => {
  const context = useContext(TitlesContext);
  if (!context) throw new Error('useTitles must be used within TitlesProvider');
  return context;
};
