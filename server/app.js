const express = require('express')
const app = express()
const port = 8889
const Router = require('./router/router')
const Databaseconnection = require("./database/databaseconnection")
const ManagersModel = require("./model/Accounts/Managersmodel")
app.use('/api', Router)
// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.listen(port, () => console.log(`App is listening on port ${port}!`))