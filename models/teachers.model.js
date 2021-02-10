const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    staff_no : {
        type: String,
        required: true,
        unique: true
    },
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    level : {
        type: Number,
        required: true
    },
    class_held : {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;