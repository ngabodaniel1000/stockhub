// importing modules
const express = require('express')
const app = express()
const port = 8889
const Router = require('./router/router')
const Databaseconnection = require("./database/databaseconnection")
const ManagersModel = require("./model/Accounts/Managersmodel")
const cors = require("cors")

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
        origin:"http://localhost:8888", // Replace with your frontend URL
        credentials: true, // Allow credentials (cookies, authorization headers)
            }
))

// to call all routes
app.use('/api', Router)

// listening server port 
app.listen(port, () => console.log(`App is listening on port ${port}!`))