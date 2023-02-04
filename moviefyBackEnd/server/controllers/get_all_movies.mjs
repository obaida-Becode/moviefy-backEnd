//@Desc    GET MOVIES BY FETCH API
//@Router  get api/movies

import asyncHandler from "express-async-handler";

const get_all = asyncHandler(async (req, res) => {
  const FEATURED_API =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e2ea313b646a713c697b7ebc007299c3";

  const response = await fetch(FEATURED_API);
 
  if (!response.ok) {
    res.status(404).json({ msg: `Error fetching movie data` });
  }
  const data = await response.json();

  res.status(200).json({ data });

  
});
export default get_all;
