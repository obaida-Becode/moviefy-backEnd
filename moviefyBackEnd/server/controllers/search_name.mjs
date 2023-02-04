//@Desc    Search movie by name
//@Router  get api/movies/name/:name

import asyncHandler from "express-async-handler";

const get_name = asyncHandler(async (req, res) => {
  const title = req.params.name;
  
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=e2ea313b646a713c697b7ebc007299c3&query=+${title}`;

  const response = await fetch(SEARCH_API);
  
  
  if (!response.ok) {
    res.status(404).json({ msg: `Error fetching movie data` });
  }
  const data = await response.json();
  
  const movie = data.results.find((movie) => movie.title === title);

  if (!movie) {
    res.status(404).json({ msg:`there is no movie with this title ${title}` });
  }
  res.status(200).json({ data: movie });
});

export default get_name;
