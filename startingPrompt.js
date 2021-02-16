const inquirer = require("inquirer");

const { getAllRecords, endConnection } = require("./db/controllers");

// 1st prompt
function startingPrompt() {
  inquirer.prompt([
    {
      type: "list",
      name: "whatToDo",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "View Employees By Manager", 
        "View Roles",

        "Add Employee", 
        "Add Role",
        "View Employees By Manager", 
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Remove Role"
      ]
    }
  ])
  .then(async(choice) => {
    //console.log(`this log is on line 25 in prompt.js. Choice: ${choice.whatToDo}`)
    if (choice.whatToDo === "View Departments") {
      await getAllRecords('department');
      return startingPrompt();
    } 
    
    else if (choice === "Add Employee") {
      addEmployee();
    } 
    
    else if (choice === "Remove Employee") {
      removeEmployee();
    }

    else if (choice === "Update Employee Role") {
      updateEmployeeRole();
    }

    else if (choice === "Update Employee Manager") {
      updateEmployeeManager();
    }

    else if (choice === "View All Roles") {
      viewAllRoles();
    }

    else if (choice === "Add Role") {
      addRole();
    }

    else if (choice === "Remove Role") {
      removeRole();
    }
    else {
      endConnection();
    }
  })
}

module.exports = {
  startingPrompt
};
