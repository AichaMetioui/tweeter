const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: {
    type: String,

  },
  LastName: {
    type: String,

  },
  EmailAdress: {
    type: String,

  },
  password: {
    type: String,

  },

})




const mSchema = mongoose.model("Users", userSchema);

module.exports = mSchema;
