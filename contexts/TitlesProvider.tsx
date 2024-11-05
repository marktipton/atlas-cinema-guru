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

  return (
    <TitlesContext.Provider value={{ titles, setTitles }}>
      {children}
    </TitlesContext.Provider>
  );
};

export const useTitles = () => {
  const context = useContext(TitlesContext);
  if (!context) throw new Error('useTitles must be used within TitlesProvider');
  return context;
};