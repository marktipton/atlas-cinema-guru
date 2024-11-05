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
  currentPage: number;
  totalPages: number;
  setTitles: React.Dispatch<React.SetStateAction<Title[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchTitles: (page: number) => void; // New method for fetching titles
  toggleFavorite: (id: string) => void;
  toggleWatchLater: (id: string) => void;
};

const TitlesContext = createContext<TitlesContextType | undefined>(undefined);

export const TitlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [titles, setTitles] = useState<Title[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0); // New state for total pages

  useEffect(() => {
    if (session) {
      fetchTitles(currentPage); // Fetch titles on session change or currentPage change
    }
  }, [session, currentPage]);

  const fetchTitles = async (page: number) => {
    try {
      const response = await fetch(`/api/titles?page=${page}`, {
        headers: {
          Authorization: `Bearer ${session.user?.id}`,
        },
      });
      const data = await response.json();
      setTitles(data.title);
      // Assuming the API returns total pages in the response
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching titles:", error);
    }
  };

  const toggleFavorite = async (id: string) => {
    setTitles((prevTitles) =>
      prevTitles.map((title) =>
        title.id === id ? { ...title, favorited: !title.favorited } : title
      )
    );

    const updatedTitle = titles.find((title) => title.id === id);
    if (updatedTitle) {
      try {
        await fetch(`/api/favorites/${id}`, {
          method: updatedTitle.favorited ? "DELETE" : "POST",
        });
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    }
  };

  const toggleWatchLater = async (id: string) => {
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
  };

  return (
    <TitlesContext.Provider value={{ titles, currentPage, totalPages, setTitles, setCurrentPage, fetchTitles, toggleFavorite, toggleWatchLater }}>
      {children}
    </TitlesContext.Provider>
  );
};

export const useTitles = () => {
  const context = useContext(TitlesContext);
  if (!context) throw new Error('useTitles must be used within TitlesProvider');
  return context;
};