// //importing
// const connection = require("./db/config.js");
// const prompt = require('./prompts.js')

// // 1st: Connect to the DB
// const getAllRecords = (table) => {
//   const queryString = `SELECT * FROM ${table}`
//   connection.query(queryString, (err, res) => {
//     if (err) throw err;
//     //log all results of the SELECT statement
//     console.table(res);
//     prompt.promptWhatToDo();
//   })
// }
// getAllRecords('employee');
