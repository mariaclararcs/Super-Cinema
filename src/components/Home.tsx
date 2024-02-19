"use client"

import { Key, useEffect } from "react";
import Loading from "./Loading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Genres from "./Genres";
import { BsPlayFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import ReactPlayer from "react-player";
import FormatDate from "@/utils/formatDate";
import { useMovie } from "@/context/MovieContext";
import { MovieStateProvider, useMovieState } from "@/context/MovieStateContext";
import IMovies from "@/intefaces/IMovie";

const fetchMovieData = async (
  searchParams: URLSearchParams,
  setMovie: React.Dispatch<React.SetStateAction<IMovies | null>>,
  setTrailer: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImgLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  setIsImgLoading(true);

  let searchMovie = searchParams?.get("movie");

  if (!searchMovie) searchMovie = "harry potter";

  try {
    const searchMovieResponse = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          query: searchMovie,
        },
      }
    );

    if (
      searchMovieResponse?.data?.results &&
      searchMovieResponse.data.results.length > 0
    ) {
      const movieId = searchMovieResponse.data.results[0]?.id;
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`
      );

      setMovie(movieResponse.data);

      const trailerMovieIndex = movieResponse.data?.videos?.results?.findIndex(
        (element: { type: string }) => element.type === "Trailer"
      );
      const trailerUrl = `https://www.youtube.com/watch?v=${
        movieResponse.data?.videos?.results[trailerMovieIndex || 0]?.key
      }`;
      setTrailer(trailerUrl);
    } else {
      setMovie(null);
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    // Aqui você pode lidar com o erro de pré-renderização
  }

  setIsLoading(false);
  setIsImgLoading(false);
};

const HomeContent = () => {
  const searchParams = useSearchParams();
  const { movie, setMovie } = useMovie();
  const {
    isLoading,
    isImgLoading,
    showPlayer,
    trailer,
    setIsLoading,
    setIsImgLoading,
    setShowPlayer,
    setTrailer,
  } = useMovieState();

  useEffect(() => {
    if (!searchParams) return;

    fetchMovieData(
      searchParams,
      setMovie,
      setTrailer,
      setIsLoading,
      setIsImgLoading
    );
  }, [searchParams, setMovie, setTrailer, setIsLoading, setIsImgLoading]);

  return (
    <div className="bg-primary relative px-4 md:px-0 min-h-screen">
      {isLoading && <Loading />}
      <div className="container mx-auto md:min-h-[calc(100vh-77px)] flex flex-col lg:flex-row gap-10 lg:mx-10">
        <div className="flex-col lg:flex-row flex gap-10 lg:mx-10 py-12">
          {movie ? (
            <>
              <div className="mx-auto flex-none relative">
                <Image
                  src={
                    movie?.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : ""
                  }
                  width={700}
                  height={700}
                  className="w-[350px] h-[500px] object-cover rounded-md"
                  alt="Movie Poster"
                  onLoadingComplete={() => setIsImgLoading(false)}
                  priority
                />
                {isImgLoading && <Loading />}
              </div>
              <div className="space-y-6">
                <div className="uppercase -translate-y-3 text-[20px] md:text-[25px] font-medium pr-4 text-white">
                  {movie?.title}
                </div>
                <div className="flex gap-4 flex-wrap">
                  {movie?.genres?.map((genre: { id: Key | null | undefined; name: string }, i: number) => (
                    <Genres
                      key={genre?.id}
                      index={i}
                      length={movie?.genres?.length}
                      name={genre?.name}
                    />
                  ))}
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                  <div>Language: {movie?.original_language?.toUpperCase()}</div>
                  <div>Version: {FormatDate(movie?.release_date)}</div>
                  <div>Time: {movie?.runtime}m</div>
                  <div>Classification: {movie?.vote_average} ⭐</div>
                </div>
                <div className="pt-14 space-y-2 pr-4">
                  <div>About:</div>
                  <div className="lg:line-clamp-4 text-justify">
                    {movie?.overview}
                  </div>
                </div>
                <div className="inline-block pt-6 cursor-pointer" onClick={() => setShowPlayer(true)}>
                  <div className="flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-[#B4B4B4]">
                    <BsPlayFill size={24} />
                    Watch Trailer
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Esse filme não existe.</p>
          )}
        </div>
        {trailer && (
          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
              showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
            }`}
          >
            <div className="flex items-center justify-between bg-black text-[#F9F9F9] p-3.5">
              <span className="font-semibold">Playing Trailer</span>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                onClick={() => setShowPlayer(false)}
              >
                <IoMdClose className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url={trailer}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => (
  <MovieStateProvider>
    <HomeContent />
  </MovieStateProvider>
);

export default Home;