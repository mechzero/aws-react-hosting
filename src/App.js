import {useState,useEffect} from 'react';
import MovieCard from './MovieCard';
import './App.css';
import  SearchIcon from './search.svg';


const API_URL ='https://www.omdbapi.com/?apikey=7f7ea1f0';
const movie1 = {
    "Title": "Batman v Superman: Dawn of Justice",
    "Year": "2016",
    "imdbID": "tt2975590",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
   // "Poster": "N/A"
}


const App = () => {
    const [movies, SetMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
      
        const data = await response.json();

        SetMovies(data.Search);
    }

    const handleSearch = () => {
        searchMovies(searchTerm);
      };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      };

    useEffect(() =>{
        searchMovies('Batman');
    }, []);

    return (
        <div className = "app">
            <h1>MovieLand</h1>

            <div className ="search">
                <input
                placeholder= "Search for movies"
                value = {searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress} 
                />
                <img
                src={SearchIcon}
                alt ="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

        {movies?.length > 0
                ? (
                <div className="container"> 
                   {movies.map((movie) => (
                    <MovieCard movie = {movie}/>
                   ))}
                    </div>          
            ) : (
                <div className= "empty">
                    <h2> No Movies found</h2>
                </div>
            )

        }
        </div>
    );
}
export default App;