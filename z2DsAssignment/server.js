const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//const todoRoutes = express.Router();// why this
let goInto = require('./goInto');

const PORT = 4000;

//all requests will be directed to goInto.js 
app.use('/', goInto);

//server runs on port no 4000
app.listen(PORT, function(){
    console.log("Server is running on Port " + PORT);
 }) 