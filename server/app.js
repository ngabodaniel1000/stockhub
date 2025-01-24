// importing modules
const express = require('express')
const app = express()
const port = 8889
const Router = require('./router/router')
const Databaseconnection = require("./database/databaseconnection")
const ManagersModel = require("./model/Accounts/Managersmodel")
const cors = require("cors")
const session = require("express-session")
const MongoStore = require("connect-mongo")

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
        origin:"http://localhost:8888", // Replace with your frontend URL
        credentials: true, // Allow credentials (cookies, authorization headers)
            }
))
// Session middleware (without MongoStore)
app.use(session({
    secret: "ddklddkldkldkldkl", // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: 'mongodb://localhost:27017/stockhub', // MongoDB URL
      collectionName: 'sessions', // Optional: name of the collection to store sessions
    }),
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24,sameSite: 'lax'} // 30 minutes; change to `secure: true` for production
  }));

// to call all routes
app.use('/api', Router)

// listening server port 
app.listen(port, () => console.log(`App is listening on port ${port}!`))