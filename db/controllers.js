const connection = require('./config.js');

//1st: Connect to the DB
connection.connect((err) => {
  if (err) throw err;
  console.log(`mySQL connected`);
});

// getting all employees from db
const getAllRecords = (table) => {
  connection.query(`SELECT * FROM ${table}`, (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
  });
};
getAllRecords('employee');
