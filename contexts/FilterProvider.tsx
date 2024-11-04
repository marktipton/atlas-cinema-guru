"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the filter state
type FilterState = {
  search: string;
  minYear: number | null;
  maxYear: number | null;
  selectedGenres: string[];
};

// Define the context type
type FilterContextType = {
  filter: FilterState;
  updateFilter: (newFilter: Partial<FilterState>) => void;
};

// Create a context with the defined type, initialized as undefined
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Define props for the provider component
type FilterProviderProps = {
  children: ReactNode;
};

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    minYear: null,
    maxYear: null,
    selectedGenres: [],
  });

  // Update function that merges the new filter with the current state
  const updateFilter = (newFilter: Partial<FilterState>) => {
    setFilter((prevFilter) => ({ ...prevFilter, ...newFilter }));
  };

  return (
    <FilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook for accessing the filter context with a type guard
export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};