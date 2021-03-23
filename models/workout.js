const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Schema for user inputted workouts
const workoutSchema = new Schema({
    day:{
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            trim: true,
            required: true
        },
        weight: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        distance: {
            type: Number,
        },
        duration: {
            type: Number,
            required: true
        }
    }],
},{
    toJSON: {
        virtuals: true
    }
}
)

//Creates a Workout model based on the workoutSchema schema
const Workout = mongoose.model('Workout', workoutSchema)

//Exports Workout model
module.exports = Workout