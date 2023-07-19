const mongoose = require('mongoose');
const { Schema } = mongoose;


const EventSchema = new Schema({
  user: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  image: {
    type : String,
    required : true
  },
  title : {
    type : String,
    required : true
  },
   
  description : {
    type : String,
    required : true,
  },

  address : {
    type : String,
    required : true,
  },

  date : {
    type : Date,
    required : true,
  },

  volunteer : {
    type : Number,
    required : true,
  },
  registrations : [{
    name : String,
    email : String
  }]

}); 

module.exports = mongoose.model('events', EventSchema);