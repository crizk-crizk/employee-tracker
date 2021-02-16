const inquirer = require("inquirer");

const {
  //names of functions to be imported
} = require("./db/controllers");

// 1st prompt
function startingPrompt() {
  inquirer.prompt([
    {
      type: "list",
      name: "whatToDo",
      message: "What would you like to do?",
      choices: [
        "View All Employees By Manager", 
        "Add Employee", 
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "Remove Role"]
    }
  ])
  .then((choice) => {
    console.log(`this log is on line 25 in prompt.js. Choice: ${choice}`)
    if (userDecision === "View All Employees By Manager") {
      viewAllEmployeesByManager();
    } 
    
    else if (userDecision === "Add Employee") {
      addEmployee();
    } 
    
    else if (userDecision === "Remove Employee") {
      removeEmployee();
    }

    else if (userDecision === "Update Employee Role") {
      updateEmployeeRole();
    }

    else if (userDecision === "Update Employee Manager") {
      updateEmployeeManager();
    }

    else if (userDecision === "View All Roles") {
      viewAllRoles();
    }

    else if (userDecision === "Add Role") {
      addRole();
    }

    else if (userDecision === "Remove Role") {
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
