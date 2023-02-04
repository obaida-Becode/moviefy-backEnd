import express from "express";
import get_all from "../controllers/get_all_movies.mjs";
import get_id from "../controllers/search_byId.mjs";
import get_name from "../controllers/search_name.mjs";
import get_genre from "../controllers/search_genre.mjs";
import get_year from "../controllers/search_year.mjs";
import get_latest from "../controllers/latest_movie.mjs";
import get_topRated from "../controllers/top_rated.mjs";

const router = express.Router();

router.get("/", get_all);
router.get("/find/id/:id", get_id);
router.get("/find/name/:name", get_name);
router.get("/find/genre/:genre", get_genre);
router.get("/find/year/:year", get_year);
router.get("/latest/",get_latest)
router.get("/toprated/",get_topRated)

export default router;
