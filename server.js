const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

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
        welcomeMessage: "You lucky bitch"
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


app.listen(3000, function() {
    console.log("Server is up on 3000");
});