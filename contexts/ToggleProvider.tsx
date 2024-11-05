"use client";

import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Title } from '../types';

type ToggleContextType = {
  toggleFavorite: (id: string) => void;
  toggleWatchLater: (id: string) => void;
  titles: Title[]; // If you want to manage the list of titles here as well
  setTitles: React.Dispatch<React.SetStateAction<Title[]>>; // Allows other contexts to update titles if needed
};

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export const ToggleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [titles, setTitles] = useState<Title[]>([]);

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
    <ToggleContext.Provider value={{ toggleFavorite, toggleWatchLater, titles, setTitles }}>
      {children}
    </ToggleContext.Provider>
  );
};

// Custom hook to use ToggleContext in other components
export const useToggle = (): ToggleContextType => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
};