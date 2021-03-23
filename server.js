//Dependencies
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

//Test
const Workout = require('./models/workout.js')

// Initializes the variable "app" with express()
const app = express()

//Configures express
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Sets port to a value
const PORT = process.env.PORT || 7103

//String for connecting to MongoDB Atlas
//const connectionString = 'mongodb+srv://testUser:SaurophaganaxCrownVodkaWalrus@workouttrackercluster.rolgz.mongodb.net/workoutTracker?retryWrites=true&w=majority'

//Connects to workoutTracker collection in workoutTrackerCluster via mongoose, first argument is connectionString, second argument are settings that prevent deprecation warnings
//mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {useNewUrlParser: true, useUnifiedTopology: true})

//Upon successfully connecting to database, initiates express to listen on PORT
.then((result) => app.listen(PORT, () => {
    console.log(`Connection made to database. Server started on port ${PORT}`)
   })
)

//If connection to DB returns an error, logs error to console
.catch((er) => console.log(err))

//Sets up static folder
app.use(express.static(path.join(__dirname, 'public'),{extensions:['html']}))

//API ROUTES

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

app.put('/api/workouts/:id', (req, res) =>{
    Workout.findByIdAndUpdate(req.params.id,
        {$push: {exercises: req.body},
        $inc: {totalDuration: req.body.duration}})
        .then((result) => {
            res.json(result)
        })
        .catch((err) =>{
            console.log(err)
        })
    })

app.get('/api/workouts/range', (req, res) => {
    Workout.find()
    .then((result) => {
        res.json(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})

app.post('/api/workouts/range', (req, res) => {
    Workout.create({})
    .then((result) => {
        res.json(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})
