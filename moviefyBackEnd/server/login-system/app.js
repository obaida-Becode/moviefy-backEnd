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
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

var userProfile;
dotenv.config();
mongoose
.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log('DB connected!'))
.catch(err => console.error(err));

// Create a new Express application

const app = express();

app.use(session({
  resave : false,
  saveUninitialized : true,
  secret : 'SECRET',
 }));

 app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
// Use body-parser to parse form data sent via HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));
// Use body-parser to parse JSON data sent via HTTP POST
app.use(bodyParser.json());
app.use(express.urlencoded({extended : false}));
// Set up a route to serve the homepage

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



 app.get('/', welcome);


app.get('/success', (req,res)=>{res.render('success',{
  userProfile: userProfile
  })
  console.log(userProfile.id);
});


app.get('/error', (req, res) => res.send("error logging in"));

const GOOGLE_CLIENT_ID = '744662422798-ncvn9bp31bphahcgk2pg1gsce3in6uig.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
},
function(accessToken, refreshToken, profile, done) {
  userProfile=profile;
  return done(null, userProfile);
}
));

app.get('/auth/google', 
passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/error' }),
function(req, res) {
  // Successful authentication, redirect success.
  res.redirect('/success');
});
  
const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));
  