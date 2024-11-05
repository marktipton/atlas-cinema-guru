import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Title } from '../types';

type FavoritesContextType = {
  favorites: Title[];
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Title[]>([]);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      try {
        const response = await fetch('/api/favorites');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setFavorites(data.favorites);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavoritesData();
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};