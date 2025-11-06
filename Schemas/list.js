const mongoose = require("mongoose");
const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt:{

    type: Date,
    default: Date.now,  
  },
  updatedAt:{
    type: Date,
    default: Date.now,
  },
  user:{
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
});
const ListModel = mongoose.model("List", listSchema);
module.exports = ListModel;