const mongoose = require('mongoose');

// Define the consultant schema
const consultantprofileSchema = new mongoose.Schema({
  headline:{
    type:String,
  },
  about:{
    type:String, 
  },
  gender:{
    type:String
  },
  dateOfBirth:{
    type:String
  }
});


module.exports =  mongoose.model('ConsultantProfile', consultantprofileSchema);

