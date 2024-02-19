"use client";

import ISeries from "@/intefaces/ISeries";
import Image from "next/image";
import formatDateYear from "@/utils/formatDateYear";
import { useState } from "react";

interface ItemProps {
    key: number;
    poster_path: string;
    name: string;
    genres: [{ name: string; id: number }];
    original_language: string;
    first_air_date: string;
    vote_average: string;
    overview: string;
}

const ItemSeries = ({
    key,
    poster_path,
    name,
    genres,
    original_language,
    first_air_date,
    vote_average,
    overview,
    }: ItemProps) => {

    return(
        <div className="flex flex-col items-center mt-6 mx-4">
            <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 mx-auto my-auto">
                <Image
                    src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : ''}
                    width={400}
                    height={650}
                    className="h-full w-full max-w-400 max-h-650 object-cover object-center lg:h-full lg:w-full"
                    alt="TV Show Poster"
                    priority
                />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-white">
                            <a href="" className="uppercase font-semibold">
                                <span aria-hidden="true" className="absolute inset-0"></span>
                                {name}
                            </a>
                        </h3>
                        <p className="mt-1 text-sm text-white">{formatDateYear(first_air_date)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemSeries;