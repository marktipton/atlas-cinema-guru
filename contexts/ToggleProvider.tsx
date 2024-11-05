"use client";
import React, { createContext, useContext, useCallback } from 'react';
import { useTitles } from './TitlesProvider';

type ToggleContextType = {
  toggleFavorite: (id: string) => void;
  toggleWatchLater: (id: string) => void;
};

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export const ToggleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { titles, setTitles } = useTitles();

  const toggleFavorite = useCallback(async (id: string) => {
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
  }, [titles, setTitles]);

  const toggleWatchLater = useCallback(async (id: string) => {
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
  }, [titles, setTitles]);

  return (
    <ToggleContext.Provider value={{ toggleFavorite, toggleWatchLater }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => {
  const context = useContext(ToggleContext);
  if (!context) throw new Error('useToggle must be used within ToggleProvider');
  return context;
};