//@Desc    search movie by id
//@Router  get api/movies/id/:id

import asyncHandler from "express-async-handler";

const get_id = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

     const SEARCH_API = `https://api.themoviedb.org/3/movie/${id}?api_key=e2ea313b646a713c697b7ebc007299c3`

  const response = await fetch(SEARCH_API);

    if (!response.ok) {
      res.status(404).json({ msg: `Error fetching movie data` });
    }
  const data = await response.json();
  
  

  if (!data) {
    res.status(404).json({ msg: `there is no movie with this id ${id}` });
  }
  

  res.status(200).json(data);

});
export default get_id;

