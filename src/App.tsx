import {useState, type MouseEvent} from 'react'
import { authenticate, getMovies, addMovie, updateMovie } from './lib/actions';

import Authenticator from './components/Authenticator';
import MovieList from './components/MovieList';
import Controls from './components/Controls';
import Update from './components/Update';

//const MOVIES_URL = 'http://localhost:3000';
const MOVIES_URL = 'https://movie-reviews-api-wine.vercel.app';

import './App.css'

function App() { 

  const [movieData, setMovieData] = useState<[] | null>(null);
  const [sortKey, setSortKey] = useState<string>('year');
  const [updateKey, setUpdateKey] = useState<string | number | null>(null);

   const getAuthentication = (username: string, password: string) => {

    authenticate(MOVIES_URL + '/login', username, password)
      .then(() => {
        getMovies(MOVIES_URL)
          .then((data: []) => {
            setMovieData(data);
          })
          .catch((error) => {
            console.error('Error fetching movies:', error);
            setMovieData(null);
          });
      })
      .catch((error) => {
        console.error('Error authenticating:', error);
      });
  }

  const refreshMovies = () => {
    getMovies(MOVIES_URL)
      .then((data: []) => {
        setMovieData(data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setMovieData(null);
      });
  }

  const updateMovies = (movieData: any) => {
    if (updateKey === 'new') {
      addMovie(MOVIES_URL, movieData)
        .then(() => refreshMovies())
        .catch((error) => {
          console.error('Error adding movie:', error);
          setMovieData(null);
        });

    } else {
      updateMovie(MOVIES_URL, movieData.id, movieData)
        .then(() => refreshMovies())
        .catch((error) => {
          console.error('Error updating movie:', error);
          setMovieData(null);
        });
    }
    setUpdateKey(null);
  }

  const downloadJSON = () => {
    if (!movieData || movieData.length === 0) {
      alert('No movie data available to download.');
      return;
    }

    const finalData = '{"movies": ' + JSON.stringify(movieData, null, 2) + '}';
    const blob = new Blob([finalData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().replace(/[:.]/g, '-'); // Format date for filename
    a.href = url;
    a.download = 'reviews-' + date + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const handleSort = (e: MouseEvent<HTMLButtonElement>, key: string) => {
    const target = e.target as HTMLButtonElement;
    target.classList.add('selected');
    setSortKey(key);
  };

  if (!movieData) return <Authenticator onAuthenticate={getAuthentication} />;
  return <div className="container mx-auto relative">
    <Controls setSortKey={handleSort} setUpdateKey={setUpdateKey} />
    <MovieList movieData={movieData} sortKey={sortKey} setUpdateKey={setUpdateKey} />
    {(updateKey != null) ? <Update movieData={movieData} updateKey={updateKey} setUpdateKey={setUpdateKey} updateMovies={updateMovies} downloadJSON={downloadJSON}></Update> : ''}
  </div>;
}

export default App
