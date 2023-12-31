import  { useEffect, useState } from 'react';
import { movieTitles } from '../constants';
import { Link,  } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = '2604040a';

// Fetching movie from constants
  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = [];
      for (const event of movieTitles) {
        try {
          const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${event.title}&type=movie`);
          if (response.ok) {
            const movie = await response.json();
            movieData.push(movie);
          } else {
            console.error(`Failed to fetch data for ${event}. Status code: ${response.status}`);
          }
        } catch (error) {
          setError(error.message);
        }
      }
      setMovies(movieData);
    };
    fetchMovies();
  }, [apiKey]);

  
  return (
    <div className='my-20 mx-20 '>
      {error && <p>{error}</p>}
      <div className='flex flex-wrap gap-10 justify-center'>
 {/* Linking  every movie card to its details  */}
        {movies.map((movie) => (
          <Link 
            key={movie.imdbID} 
            to={`/${movie.imdbID}`}
            > 
              <div className='bg-tertiary px-4 py-4 shadow-md shadow-primary rounded-xl flex flex-col gap-2'>
                <div>
                  <p className='mx-2 my-2 px-2 py-2 absolute bg-tertiary rounded-lg bg-opacity-70'>{movie.Type}</p>
                  <img src={movie.Poster} alt={movie.Title}/>
                </div>
                <h2 className='font-semibold text-[20px]'>{movie.Title}</h2>
                <div className='flex justify-between items-center'>
                  <p>Year: {movie.Year}</p>
                  <p className='text-[12px]'>{movie.Director}</p>
                </div>
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;


