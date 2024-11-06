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
};

type Activity = {
  type: 'favorited' | 'unfavorited';
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

  // Fetch paginated titles whenever the session or currentPage changes
  useEffect(() => {
    if (session) {
      fetch(`/api/titles?page=${currentPage}`, {
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
  }, [session, currentPage]);

  const setPage = (page: number) => {
    setCurrentPage(page);
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
            type: updatedTitle.favorited ? 'unfavorited' : 'favorited', // Determine action type based on current status
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
      } catch (error) {
        console.error("Error updating watch later:", error);
      }
    }
  }, [titles]);

  return (
    <TitlesContext.Provider value={{ titles, currentPage, hasMore, setPage, toggleFavorite, toggleWatchLater }}>
      {children}
    </TitlesContext.Provider>
  );
};

export const useTitles = () => {
  const context = useContext(TitlesContext);
  if (!context) throw new Error('useTitles must be used within TitlesProvider');
  return context;
};