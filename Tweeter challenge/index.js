const express =require("express")
const app= express();
const port = 7008;
const mongoose = require('mongoose');
const data = require("./models/firstSchema")
const routes=require("./config/routes");
var cookieParser = require('cookie-parser')




mongoose.connect('mongodb+srv://aichametioui:UC9pR8WrdRnjMggC@cluster0.dlcjunu.mongodb.net/PRTWO?retryWrites=true&w=majority&appName=Cluster0')


app.use(cookieParser())

//parsing incoming data from form to an object
app.use(express.urlencoded({ extended: true }));
//set the view engine as ejs to be able to show ejs code
app.set("view engine", "ejs");
//tell the server where to find routes
app.use(routes)
//start the server





app.listen(port,()=>{
    console.log( `app runing at ${port}`);
} )


