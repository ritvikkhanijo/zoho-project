var mongoose=require("mongoose");
var commentSchema=new mongoose.Schema({
  author:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username:String
  },
  comment:String,
});

module.exports=mongoose.model("comment",commentSchema);