const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

//port configured for heroku use 
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

//how to create middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    //creates new file
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});

// //maintenance middleware
// app.use((req, res, next) => {
//     res.render("maintenance");
// });

app.use(express.static(__dirname + "/public"));


//handlebars helper allows to pass through to html
hbs.registerHelper("getCurrentYear", function() {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", function(text) {
    return text.toUpperCase();
});



app.get("/", function(req, res) {
    // res.send("<h1>hello express</h1>");
    res.render("home.hbs", {
        pageTitle: "Homepage",
        welcomeMessage: "You lucky son of a gun"
    });
});

app.get("/about", function(req, res){
    res.render("about.hbs", {
        pageTitle: "About page"
    });
});

app.get("/bad", function(req, res){
    res.send({
        errorMessage: "You failed everything!"
    });
});

app.get("/projects", function(req, res){
    res.render("projects.hbs", {
        pageTitle: "Portfolio Page",
        welcomeMessage: "Portfolio projects here"
    });
});



app.listen(port, function() {
    console.log(`Server is up on ${port}`);
});