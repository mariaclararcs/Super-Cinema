"use client"

import Navbar from "./Navbar";
import '../app/globals.css';
import Image from "next/image";
import Item from "./Item";
import axios from "axios";
import { useEffect, useState } from "react";
import IMovies from "@/intefaces/IMovie";

const FetchMovies = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, {
            params: {
                api_key: process.env.NEXT_PUBLIC_API_KEY,
            }
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies', error);
        return [];
    }
}

const MoviesPage = () => {
    const [movies, setMovies] = useState<IMovies[]>([]);
    const [searchMovie, setSearchMovie] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data: IMovies[] = await FetchMovies();
            setMovies(data);
            console.log(data);
        };

        fetchData();
    }, []);

    const filterMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchMovie.toLowerCase())
    );

    return(
        <>
            <Navbar />
            <div className="bg-primary">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div>
                        <input 
                            type="text"
                            placeholder="Search a movie on the list"
                            value={searchMovie}
                            onChange={(e) => setSearchMovie(e.target.value)}
                            className="bg-gray-700 px-4 py-2 outline-none placeholder:text-textColor border border-textColor rounded-md text-sm font-semibold"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start -mx-4">
                        {filterMovies.map(movie => (
                            <Item
                                key={movie.key}
                                poster_path={movie.poster_path}
                                title={movie.title}
                                genres={movie.genres}
                                original_language={movie.original_language}
                                release_date={movie.release_date}
                                runtime={movie.runtime}
                                vote_average={movie.vote_average}
                                overview={movie.overview}
                                videos={movie.videos}
                            />
                        ))}

                        {!filterMovies ? movies.map(movie => (
                            <Item 
                            key={movie.key}
                            poster_path={movie.poster_path}
                            title={movie.title}
                            genres={movie.genres}
                            original_language={movie.original_language}
                            release_date={movie.release_date}
                            runtime={movie.runtime}
                            vote_average={movie.vote_average}
                            overview={movie.overview}
                            videos={movie.videos} />
                        )) : ('')}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MoviesPage;