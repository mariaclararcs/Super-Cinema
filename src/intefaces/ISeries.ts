interface ISeries{
    key: number;
    poster_path: string;
    name: string;
    genres: [
        {
            name: string;
            id: number;
        }
    ];
    original_language: string;
    first_air_date: string;
    vote_average: string;
    overview: string;
}

export default ISeries;