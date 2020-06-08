const mongoose = require("mongoose");

var commentschema = new mongoose.Schema({
    comments: String,
    author : String
});
module.exports = mongoose.model("comment", commentschema);