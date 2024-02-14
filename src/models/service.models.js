const mongoose = require('mongoose');


const serviceSchema = new mongoose.Schema({
    consultantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ConsultantUser"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    serviceCategory:{
        type:String,
        enum:["1:1 Meeting"],
        default:"1:1 Meeting"
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Service', serviceSchema);
