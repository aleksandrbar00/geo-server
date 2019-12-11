const mongoose = require("mongoose")

const rateSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const meetPointSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 6
    },
    about: {
        type: String,
        min: 6
    },
    meetTime: {
        type: Date,
        default: new Date()
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [Number]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    rates: [rateSchema],
    rating: {
        type: Number,
        default: 0
    }
})

meetPointSchema.index({location: '2dsphere'})

module.exports = mongoose.model('meetPoint', meetPointSchema)