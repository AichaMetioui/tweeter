const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
 Title: {
    type: String,

  },
Tweet: {
    type: String,

  },  

})

 


const TweetSchema = mongoose.model("Data", tweetSchema);

module.exports =  TweetSchema;
