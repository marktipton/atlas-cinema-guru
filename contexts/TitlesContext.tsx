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
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
};

const TitlesContext = createContext<TitlesContextType | undefined>(undefined);

export const TitlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [titles, setTitles] = useState<Title[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTitles = async (page: number) => {
    if (session) {
      try {
        const response = await fetch(`/api/titles?page=${page}`, {
          headers: {
            Authorization: `Bearer ${session.user?.id}`,
          },
        });
        const data = await response.json();
        setTitles(data.title);
        setTotalPages(data.totalPages); // assuming your API returns total pages
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    }
  };

  useEffect(() => {
    fetchTitles(currentPage);
  }, [session, currentPage]);

  const setPage = (page: number) => setCurrentPage(page);
  return (
    <TitlesContext.Provider value={{ titles, setTitles, currentPage, totalPages, setPage }}>
      {children}
    </TitlesContext.Provider>
  );
};

export const useTitles = () => {
  const context = useContext(TitlesContext);
  if (!context) throw new Error('useTitles must be used within TitlesProvider');
  return context;
};
