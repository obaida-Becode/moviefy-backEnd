import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {welcome, reg, dash} from './routes/index.js';
import {login, register, userRegister, userLogin, logout} from './routes/users.js';
import expressEjsLayouts from 'express-ejs-layouts';
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
import passportConfig from './config/passport.js';
import ensureAuthenticated from "./config/auth.js"
var userProfile;

// Create a new Express application

app.use(passport.session());



// Set up EJS as the view engine


//express session

 //use flash
 app.use(flash());
 app.use((req,res,next)=> {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error  = req.flash('error');
 next();
 })

app.get('/users/login', login);
app.get('/users/register', register);
app.post('/users/register', userRegister);
app.post('/users/login', userLogin);
app.get('/users/logout', logout);
app.get('/register', reg);
app.get('/dashboard',ensureAuthenticated,dash);

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));

