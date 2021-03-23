//Dependencies
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

//Test
const Workout = require('./models/workout.js')

// Initializes the variable "app" with express()
const app = express()

//
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Sets port to a value
const PORT = process.env.PORT || 7103

//Connect to MongoDB
const connectionString = 'mongodb+srv://testUser:SaurophaganaxCrownVodkaWalrus@workouttrackercluster.rolgz.mongodb.net/workoutTracker?retryWrites=true&w=majority'

//Connects to workoutTracker collection in workoutTrackerCluster via mongoose, first argument is connectionString, second argument are settings that prevent deprecation warnings
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})

//Upon successfully connecting to database, initiates express to listen on PORT
.then((result) => app.listen(PORT, () => {
    console.log(`Connection made to database. Server started on port ${PORT}`)
   })
)

//If connection to DB returns an error, logs error to console
.catch((er) => console.log(err))

//Sets up static folder
app.use(express.static(path.join(__dirname, 'public'),{extensions:['html']}))

//Test routes
app.get('/testAddWorkout', (req, res) => {
    const workoutInstance = new Workout({
        exercises: {
            type: 'Resistance',
            name: 'test workout',
            weight: 1,
            sets: 2,
            reps: 3,
            duration: 4,
        }
    })

    workoutInstance.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})

app.get('/api/workouts', (req, res) => {
    Workout.find()
    .then((result) => {
        res.json(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})

app.post('/api/workouts', (req, res) => {
    Workout.create({})
    .then((result) => {
        res.json(result)
        console.log('It worked!')
    })
    .catch((err) =>{
        console.log(err)
    })
})
//TEST
app.put('/api/workouts/:id', (req, res) => {
    const workoutInstance = new Workout({
        exercises: req.body
    })

    workoutInstance.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})
