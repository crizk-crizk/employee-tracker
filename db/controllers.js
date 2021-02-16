const connection = require('./config.js');

//1st: Connect to the DB
connection.connect((err) => {
  if (err) throw err;
  console.log(`mySQL connected`);
});

// getting all employees from db
const getAllRecords = async (table) => {
  let resolver;
  const queryPromise = new Promise((resolve, reject) => {
    resolver = resolve;
  });

  const queryString = `SELECT * FROM ${table}`
  connection.query(queryString, (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    resolver(res);
  });
  return queryPromise;
};

// exit/close the connection
const endConnection = () => {
  try {
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

// module.exports = getAllRecords;
module.exports = {
  getAllRecords,
  endConnection
};

