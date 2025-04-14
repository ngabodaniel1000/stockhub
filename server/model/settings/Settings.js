const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    language: { 
        type: String, 
        required: false,
        default: "english",
        enum: ["english", "french", "kinyarwanda", "kiswahili"] 
    },
    stockminlevel: { 
        type: Number, 
        required: false,
        default: 5,
        min: 1,
        max: 100 
    },
    darkmode: { 
        type: Boolean, 
        required: true,
        default: true
    },
    manager: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Managers",
        unique: true
    }  
}, {
    timestamps: true
});

const SettingsModel = mongoose.model('Settings', schema);
module.exports = SettingsModel;