//Dependencies
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

// Initializes the variable "app" with express()
const app = express()

//Connect to MongoDB
const connectionString = 'mongodb+srv://testUser:SaurophaganaxCrownVodkaWalrus@workouttrackercluster.rolgz.mongodb.net/workoutTracker?retryWrites=true&w=majority'

//Connects to workoutTracker collection in workoutTrackerCluster via mongoose, first argument is connectionString, second argument are settings that prevent deprecation warnings
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})

//Sets port to a value
const PORT = process.env.PORT || 7103

//Listens, reports to console that a server has successfully started on PORT
app.listen(PORT, function(){
    console.log(`server started on port ${PORT}`)
   })

//Sets up static folder
app.use(express.static(path.join(__dirname, 'public'),{extensions:['html']}))
