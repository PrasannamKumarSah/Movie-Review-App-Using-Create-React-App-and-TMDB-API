import React, { useEffect,useState } from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

function Home(){

    const[ popularMovies, setPopularMovies ] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=066d78a4d2c5d86c73ae051175a572ce")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    },[])

    return(
        <div className="poster">
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={1}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                    popularMovies.map(movie => (
                        <Link style={{textDecoration:"none", color:"white"}} to={`/movie/${movie.id}`}>
                        <div className="posterImage">
                            <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                        </div>
                        <div className="posterImage__overlay">
                            <div className="posterImage__title">{movie?movie.original_title:""}</div>
                            <div className="PosterImage__runtime">
                                {movie?movie.release_date:""}
                                <span className="posterImage__rating">
                                    <i className="fas fa-star" />{" "}
                                    {movie?movie.vote_average:""}
                                </span>
                            </div>
                            <div className="posterImage__discription">{movie?movie.overview:""}</div>
                        </div>
                        </Link>
                        ) )
                }
            </Carousel>
            <MovieList />
        </div>
    );
}

export default Home