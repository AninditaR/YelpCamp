const express   = require("express");
const app       = express();
const mongoose  = require("mongoose");
const bodyParser= require("body-parser");
const Camp      = require("./models/campground"); //accesing the model of campground, this cont Campground name is used below in Campground.create, and find
      Comment   = require("./models/comments");
     // seedb     = require("./seeds");

//connect to the data base, mongoose
mongoose.connect("mongodb://localhost:27017/yelpcamp",{useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.listen(3000, function(){
    console.log("server is running");

});

//creating campground object
/*Campground.create({
    name:"sholang valley, Manali",
    image:"https://lh3.googleusercontent.com/proxy/3N9i11v178tYtUx4GxNjmjcbfbLjvsS5sEb55GMsYhrJMJsLg8HTTG_Wj703WmWinp1Md7yM8lFUw3icGpB1S1_KT2_nVs6knrhmIT1M5g"
}, function(err, campground){
    if(err){
        console.log(err);

    }
    else{
        console.log("New camp");
        console.log(campground);
    }
});*/



app.get("/home",(req,res)=>{
    
    res.render("landing");
});

//get all campground from database
app.get("/campgrounds", (req,res)=>{
    Camp.find({}, (err, campAll)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("campground",{camp:campAll});//1st one is the name we are giving, 2nd the argument we are passing
        }
    });
    
});

//campground POST route, add data persistency
app.post("/campgrounds",(req,res)=>{
    //get data from form and add this to "camps"array
    var newname  = req.body.name;
    var newimage = req.body.image;
    var newdescription = req.body.description;
     //create new object
    var newcamp = {name:newname,
                    image: newimage,
                    description: newdescription
                };
    //push the data in the camp array
    //camps.push(newcamp);

    //create a new camp and save it to db, so no loss of data
    Camp.create(newcamp, (err, newcreatecamp)=>{
        if(err){
            console.log(err);
        }
        else{
            //redirect back to the campground page
            res.redirect("/campgrounds");
        }

    });
    
});
 //show form to create new camp
app.get("/campgrounds/new", (req, res)=>{
    res.render("Newform.ejs");
});
 
//campground/ anything shows this route, campground/new should have before it in order,
app.get("/campgrounds/:id", (req, res)=>{
    //find the campground with provided id by a new method ".findByID()" using mongoose 
    Camp.findById(req.params.id, (err, foundcamp)=>{
        if(err){
            console.log(err);
        }
        else{
            //render the show template with that campground
            res.render("show",{campg:foundcamp}); // passing the object 'campg' to that template, pass foundcamp under the name campg
            //inside the template "show" we can access campg, it will have the value whatever we found with this id(i.e req.params.id)
        }
    
    });
    
});