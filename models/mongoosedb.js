var mongoose=require("mongoose");
module.exports=mongoose;
mongoose.connect("mongodb://localhost/lifeng", {read_secondary: true});