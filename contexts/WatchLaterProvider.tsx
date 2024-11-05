"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Title } from '../types'; // Import the Title type

type WatchLaterContextType = {
  watchLater: Title[];
};

const WatchLaterContext = createContext<WatchLaterContextType | undefined>(undefined);

export const WatchLaterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [watchLater, setWatchLater] = useState<Title[]>([]);

  useEffect(() => {
    const fetchWatchLaterData = async () => {
      try {
        const response = await fetch('/api/watch-later'); // Fetch watchLater from API
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setWatchLater(data.watchLater); // Assuming response has { watchLater: [...] }
      } catch (error) {
        console.error('Failed to fetch watchLater:', error);
      }
    };

    fetchWatchLaterData();
  }, []);

  // Make sure to return the context provider with children
  return (
    <WatchLaterContext.Provider value={{ watchLater }}>
      {children}
    </WatchLaterContext.Provider>
  );
};

// Custom hook for accessing the context
export const useWatchLater = (): WatchLaterContextType => {
  const context = useContext(WatchLaterContext);
  if (!context) {
    throw new Error("useWatchLater must be used within a WatchLaterProvider");
  }
  return context;
};