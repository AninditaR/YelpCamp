const mongoose = require("mongoose");

//define schema
var campschema=new mongoose.Schema({
    name  :String,
    image :String,
    //add description
    description: String
});

//compiling schema into a model
module.exports = mongoose.model("Campground", campschema);
