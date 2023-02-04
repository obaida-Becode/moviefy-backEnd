//@DESC     Search the movie by year 
//@Router   get api/movies/find/yaer/:year

import asyncHandler from "express-async-handler";

const get_year = asyncHandler(async(req,res) =>{
    const release_date = req.params.year;
    // console.log(typeof(release_date));
    if (!release_date) {
        return res.status(404).json({ msg: "release_date is not provided" });
      }

    const SEARCH_API = `https://api.themoviedb.org/3/discover/movie?api_key=e2ea313b646a713c697b7ebc007299c3&primary_query=+${release_date}`;
    const response = await fetch (SEARCH_API);
    if (!response.ok) {
        res.status(404).json({ msg: `Error fetching movie data` });
      };
    const data = await response.json();

    const movie = data.results.find((movie) => movie.release_date.includes(release_date) );
    if(!movie) {
        res.status(404).json({ msg :`there is no movie with this date ${release_date}`});
    } 
        res.status(200).json({data: movie})



});

export default get_year;