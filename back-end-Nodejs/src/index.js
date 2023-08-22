const express = require('express');

const app = express();
const multer = require("multer");
const port = 3000;

const cors = require('cors');
const rout = require('./routs/routs')
app.use(cors());
let bodyParser =  require ('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const path= require('path');

const mongoose = require ('mongoose');

mongoose.connect("mongodb+srv://ravikumar123:8369782692ravi@cluster0.qk3oh.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

    app.use('/', rout);


    const fileupload = require('express-fileupload');
    app.use(fileupload(
        {
            debug : true,
            tempFileDirectory : path.join(__dirname,'./temp'),
            useTempFiles : true

        }
    ));



    const cloudinary = require("cloudinary");


cloudinary.config({
  cloud_name: "dzxr9ixkj",
  api_key: "811974981562817",
  api_secret: "5ViWHdqaceTsAsKxhZ2R0eGKzJg"
});





app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})
