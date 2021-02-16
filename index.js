require('dotenv').config()

//importing
const connection = require("./db/config.js");
const {
  startingPrompt
} = require('./startingPrompt.js')

const {
  getAllRecords
} = require("./db/controllers.js");

startingPrompt();


