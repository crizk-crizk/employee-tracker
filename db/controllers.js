const connection = require("./config.js");

//1st: Connect to the DB
connection.connect((err) => {
  if (err) throw err;
  console.log(`mySQL connected`);
});

// getting all employees from db
const getAllRecords = async (table, showTable) => {
  let resolver;
  const queryPromise = new Promise((resolve, reject) => {
    resolver = resolve;
  });
  const queryString = `SELECT * FROM ${table}`;
  connection.query(queryString, (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    if (showTable) {
      console.table(res);
    }
    resolver(res);
  });
  return queryPromise;
};

// getting managers' name and id
const queryManagers = async (table) => {
  let resolver;
  const queryPromise = new Promise((resolve, reject) => {
    resolver = resolve;
  });

  // get all managers' id, name, surname.
  const queryString = `select id, first_name, last_name from employee_db.employee WHERE id in (SELECT DISTINCT manager_id FROM employee_db.employee WHERE manager_id is not null);`;
  connection.query(queryString, (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    //console.table(res);
    resolver(res);
  });
  return queryPromise;
};

// getting team members under a manager
const queryEmployees = async (manager_id) => {
  let resolver;
  const queryPromise = new Promise((resolve, reject) => {
    resolver = resolve;
  });
  connection.query(
    `select id, first_name, last_name from employee_db.employee WHERE ?;`,
    [{ manager_id: manager_id }],
    (err, res) => {
      if (err) throw err;
      // Log
      console.table(res);
      resolver(res);
    }
  );
  return queryPromise;
};

//create employee
const createEmployee = async (first_name, last_name, role_id, manager_id) => {
  let resolver;
  const queryPromise = new Promise((resolve, reject) => {
    resolver = resolve;
  });

  console.log("Inserting a new employee...\n");
  const query = connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: first_name,
      last_name: last_name,
      role_id: role_id,
      manager_id: manager_id,
    },
    (err, res) => {
      if (err) throw err;
      //console.log(`${res.affectedRows} user inserted!\n`);
      resolver(`${res.affectedRows} employee inserted!\n`);
    }
  );
  return queryPromise;
};

// Add Role
const createRole = async (title, salary, department_id) => {
  let resolver;
  const queryPromise = new Promise((resolve, reject) => {
    resolver = resolve;
  });

  console.log("Inserting a new role...\n");
  const query = connection.query(
    "INSERT INTO role SET ?",
    {
      title,
      salary,
      department_id,
    },
    (err, res) => {
      if (err) throw err;
      resolver(`${res.affectedRows} role inserted!\n`);
    }
  );
  return queryPromise;
};

// function goes with updateEmployeeRole prompt
const updateEmployeeById = async (roleID, employeeID) => {
  let resolver;
  const queryPromise = new Promise((resolve, reject) => {
    resolver = resolve;
  });

  console.log("Updating role...\n");
  const queryStr = `UPDATE employee
  SET role_id = ${roleID}
  WHERE id = ${employeeID};`;

  connection.query(queryStr, (err, res) => {
    if (err) throw err;
    resolver(`${res.affectedRows} role updated!\n`);
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

module.exports = {
  getAllRecords,
  endConnection,
  queryManagers,
  queryEmployees,
  createEmployee,
  createRole,
  updateEmployeeById,
};
