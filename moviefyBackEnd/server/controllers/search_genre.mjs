//@Desc    search movie by genre
//@Router  get api/movies/genre/:genre

import asyncHandler from "express-async-handler";
const get_genre = asyncHandler( async (req, res) =>{
    
    const genre_ids = (req.params.genre);
    
    
    if (!genre_ids) {
        return res.status(404).json({ msg: "genreId is not provided" });
      }
    const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=e2ea313b646a713c697b7ebc007299c3&with_genres=${genre_ids}`;
    const response = await fetch (FEATURED_API);

    if (!response.ok) {
        res.status(404).json({ msg: `Error fetching movie data` });
      }

    const data = await response.json();
    
    
    
    if(!data) {
        res.status(404).json({ msg :`there is no movie with this id genre ${genre_ids}`});
    } 

   
        res.status(200).json({data})

  
});

// not completed there are errors in code



export default get_genre;