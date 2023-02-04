import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import movie_route from './routes/movie_route.mjs'

// express app
const app = express();
/*
 middleware
    make logger for request by used morgan
    execute app.use(morgan("dev")) in development mode 
   to see status number 
*/
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log(`mode:${process.env.NODE_ENV}`);
};




app.use(express.json())

// Routes
app.use("/api/movies",movie_route);


const port = process.env.port
app.listen(port,() =>{
    console.log(`App running on port ${port}`);
});