// importing modules
const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Optional path if config.env isn't in the root folder
const port = process.env.PORT || 8080;

const Router = require('./router/router')
const Databaseconnection = require("./database/databaseconnection")
const ManagersModel = require("./model/Accounts/Managersmodel")
const cors = require("cors")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const SettingsModel = require("./model/settings/Settings")
const ProductsModel = require("./model/Products/Product")
const StockInModel = require("./model/Stockin/Stockin")
const StockOutModel = require("./model/stockout/stockout")
const CategoryModel = require("./model/category/category")
const CompanyModel = require("./model/company/company")

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
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24,sameSite: 'lax'}
  }));

// to call all routes
app.use('/api', Router)
// listening server port 
app.listen(port, () => console.log(`App is listening on port ${port}!`))