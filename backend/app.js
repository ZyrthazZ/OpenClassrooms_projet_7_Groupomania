//Imports

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const likesRouter = require("./routes/likesRouter");
const commentsRouter = require("./routes/commentsRouter");
const dotenv = require('dotenv');


//Set path to file app.env
dotenv.config({
    path: "app.env"
});

//Instantiate application
let app = express();

//Body-Parser configuration
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Call of helmet
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}));

//Middleware dealing with the CORS errors (Cross Origin Resource Sharing)
app.use((req, res, next) => {
    //Accepte les requêtes depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Accepte les requêtes comprenant certains headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //Accepte d'envoyer des requêtes avec des verbes HTTPS spécifiques
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//path indicates the way to the server
const path = require('path');

//Tells express to deal and serve on the server and the API calls the images, with the folder name 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));


//Call the routes
app.use("/api/", usersRouter);
app.use("/api/", postsRouter);
app.use("/api/", likesRouter);
app.use("/api/", commentsRouter);


//Exports

module.exports = app;