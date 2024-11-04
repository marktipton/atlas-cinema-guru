import { createContext, useContext, useState, ReactNode } from 'react';
import { Title } from '../types'; // Import the Title type

type FavoritesContextType = {
  favorites: Title[];

};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Title[]>([]);

  // Fetch favorites from API or manage favorites logic here...

  return (
    <FavoritesContext.Provider value={{ favorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook for accessing the context
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};