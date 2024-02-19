"use client"

import Navbar from "./Navbar";
import '../app/globals.css';
import Image from "next/image";
import ItemSeries from "./ItemSeries";
import axios from "axios";
import { useEffect, useState } from "react";
import ISeries from "@/intefaces/ISeries";

const FetchSeries = async (page: number = 1) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          include_adult: true,
          include_null_first_air_dates: false,
          language: 'en-US',
          page: page,
          sort_by: 'popularity.desc',
        },
      });
      console.log(response.data.results);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching series', error);
      return [];
    }
};  

const SeriesPage = () => {
    const [serie, setSerie] = useState<ISeries[]>([]);
    const [searchSerie, setSearchSerie] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data: ISeries[] = await FetchSeries();
            setSerie(data);
        };

        fetchData();
    }, []);

    const filterSeries = serie.filter(serie => 
        serie.name.toLowerCase().includes(searchSerie.toLowerCase())
    );

    return(
        <>
            <Navbar />
            <div className="bg-primary">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div>
                        <input 
                            type="text"
                            placeholder="Search a show on the list"
                            value={searchSerie}
                            onChange={(e) => setSearchSerie(e.target.value)}
                            className="bg-gray-700 px-4 py-2 outline-none placeholder:text-textColor border border-textColor rounded-md text-sm font-semibold"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start -mx-4">
                        {filterSeries.map(serie => (
                            <ItemSeries
                                key={serie.key}
                                poster_path={serie.poster_path}
                                name={serie.name}
                                genres={serie.genres}
                                original_language={serie.original_language}
                                first_air_date={serie.first_air_date}
                                vote_average={serie.vote_average}
                                overview={serie.overview}
                            />
                        ))}

                        {!filterSeries ? serie.map(serie => (
                            <ItemSeries
                                key={serie.key}
                                poster_path={serie.poster_path}
                                name={serie.name}
                                genres={serie.genres}
                                original_language={serie.original_language}
                                first_air_date={serie.first_air_date}
                                vote_average={serie.vote_average}
                                overview={serie.overview}
                            />
                        )) : ('')}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SeriesPage;