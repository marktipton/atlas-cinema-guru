import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Title } from '../types';
import { useToggle } from './ToggleProvider'; // Import the toggle hook

type FavoritesContextType = {
  favorites: Title[];
  toggleFavorite: (id: string) => void; // Include the toggleFavorite function
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Title[]>([]);
  const { toggleFavorite } = useToggle(); // Get the toggleFavorite function

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

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id); // Call the toggleFavorite function from the ToggleProvider

    // Update the favorites state optimistically
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some((title) => title.id === id);
      if (isFavorited) {
        return prevFavorites.filter((title) => title.id !== id);
      } else {
        // Optionally, fetch the updated title data from the server or construct it locally
        return [...prevFavorites, { id } as Title]; // You may need to adjust this line to include more properties
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite: handleToggleFavorite }}>
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