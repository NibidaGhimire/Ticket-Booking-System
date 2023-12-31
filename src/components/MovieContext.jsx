
import { createContext, useState } from 'react';

// Creating context
export const MovieContext = createContext();

// Creating Movie provider to access in different pages
export const MovieProvider = ({ children }) => {
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [count, setCount] = useState(1)

  return (
    <MovieContext.Provider value={{ selectedMovieDetails, setSelectedMovieDetails,count, setCount }}>
      {children}
    </MovieContext.Provider>
  );
};
