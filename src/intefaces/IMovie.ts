interface IMovies{
    key: number;
    poster_path: string;
    title: string;
    genres: [
        {
            name: string;
            id: string;
        }
    ];
    original_language: string;
    release_date: string;
    runtime: string;
    vote_average: string;
    overview: string;
    videos: {
        results: [
            {
                type: string;
                key: string;
            }
        ]
    }
}

export default IMovies;