const mongoose = require('mongoose');


const slotSchema = new mongoose.Schema({
    startTime: {
        type: String, // Representing time in HH:MM format
        required: true
    },
    endTime: {
        type: String, // Representing time in HH:MM format
        required: true
    }
});

const rangeSchema = new mongoose.Schema({
    Timeto: {
        type: String, // Representing time in HH:MM format
        required: true
    },
    end: {
        type: String, // Representing time in HH:MM format
        required: true
    },
})

// Define a schema for consultant availability
const weekTimeSchema = new mongoose.Schema([{
    weekday: {
        type: String,
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true
    },
    availbilityrange:rangeSchema,
    slots: [slotSchema] 
}]);



const defaultStartTime = '10:00';
const defaultEndTime = '11:30';



const consultantSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Consultant'
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "ConsultantProfile",
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
    },
    availbility:{
        type:[weekTimeSchema],
        default: [
            { weekday: 'Sunday',range:{Timeto: "", end: ""} , slots: [] },
            { weekday: 'Monday',range:{Timeto: defaultStartTime, end: defaultEndTime}, slots: [{ startTime: '10:00', endTime: '10:30' }, { startTime: '11:00', endTime: '11:30' }] },
            { weekday: 'Tuesday',range:{Timeto: defaultStartTime, end: defaultEndTime}, slots: [{ startTime: '10:00', endTime: '10:30' }, { startTime: '11:00', endTime: '11:30' }] },
            { weekday: 'Wednesday',range:{Timeto: defaultStartTime, end: defaultEndTime}, slots: [{ startTime: '10:00', endTime: '10:30' }, { startTime: '11:00', endTime: '11:30' }] },
            { weekday: 'Thursday',range:{Timeto: defaultStartTime, end: defaultEndTime}, slots: [{ startTime: '10:00', endTime: '10:30' }, { startTime: '11:00', endTime: '11:30' }] },
            { weekday: 'Friday',range:{Timeto: defaultStartTime, end: defaultEndTime}, slots: [{ startTime: '10:00', endTime: '10:30' }, { startTime: '11:00', endTime: '11:30' }] },
            { weekday: 'Saturday',range:{Timeto: "", end: ""} ,slots: [] },
        ]

    }

});

module.exports = mongoose.model('ConsultantUser', consultantSchema);
