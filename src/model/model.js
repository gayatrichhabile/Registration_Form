const mongoose = require('mongoose');
const {isValidEmail, isValidPhone} = require('../../validation');
const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: isValidEmail,
            message: "Enter valid email"
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: isValidPhone,
            message: "Enter valid Phone number"
        }
    }
});

const empCollection = mongoose.model('empcollection', empSchema);

module.exports = empCollection;