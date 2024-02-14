const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    consulatant:[{
        type:Schema.Types.ObjectId,
        ref: 'ConsultantUser'
    }],
    
});

module.exports = mongoose.model('Category', categorySchema);
