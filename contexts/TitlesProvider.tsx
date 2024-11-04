"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
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
  setTitles: React.Dispatch<React.SetStateAction<Title[]>>;
  toggleFavorite: (id: string) => void;
  toggleWatchLater: (id: string) => void;
};

const TitlesContext = createContext<TitlesContextType | undefined>(undefined);

export const TitlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [titles, setTitles] = useState<Title[]>([]);

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

  const toggleFavorite = (id: string) => {
    setTitles((prevTitles) =>
      prevTitles.map((title) =>
        title.id === id ? { ...title, favorited: !title.favorited } : title
      )
    );
  };

  const toggleWatchLater = (id: string) => {
    setTitles((prevTitles) =>
      prevTitles.map((title) =>
        title.id === id ? { ...title, watchLater: !title.watchLater } : title
      )
    );
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
