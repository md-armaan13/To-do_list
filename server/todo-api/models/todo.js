const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        
    },
   
    isCompleted: {
        type: Boolean,
        default: false
    },
    timestamps: {
        createdOn: {
            type: Date,
            required: true,
            default: Date.now
        },
        modifiedOn: {
            type: Date,
            required: true,
            default: Date.now
        },
        completedOn: {
            type: Date,
            default: null
        }
    }
});

module.exports = mongoose.model("Todo", todoSchema);