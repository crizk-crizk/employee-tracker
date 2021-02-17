const inquirer = require("inquirer");

const {
  getAllRecords,
  endConnection,
  queryManagers,
  queryEmployees,
  createEmployee
} = require("./db/controllers");

// 1st prompt
function startingPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "whatToDo",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Employees",
          "View Roles",
          "View Employees By Manager",
          "Add Employee",
          
          "Add Role",

          "Update Employee Role",
          "Update Employee Manager",

          "Remove Employee",
          "Remove Role",
        ],
      },
    ])
    .then(async (choice) => {
      //console.log(`this log is on line 25 in prompt.js. Choice: ${choice.whatToDo}`)
      if (choice.whatToDo === "View Departments") {
        await getAllRecords("department");
        return startingPrompt();
      } else if (choice.whatToDo === "View Employees") {
        await getAllRecords("employee");
        return startingPrompt();
      } else if (choice.whatToDo === "View Roles") {
        await getAllRecords("role");
        return startingPrompt();
      } else if (choice.whatToDo === "View Employees By Manager") {
        const managers = await queryManagers();
        const result = Object.values(JSON.parse(JSON.stringify(managers)));

        console.log(result);
        peopleUnderAManager(result);
        return startingPrompt();
      } else if (choice.whatToDo === "Add Employee") {
        const managers = await queryManagers();
        const result = Object.values(JSON.parse(JSON.stringify(managers)));
        console.log(result);

        const roles = await getAllRecords("role");
        const roleResult = Object.values(JSON.parse(JSON.stringify(roles)));

        addEmployee(result, roleResult);
        

      } else if (choice === "Add Role") {
        addRole();

        // return startingPrompt();
      } else if (choice === "Remove Employee") {
        removeEmployee();
      } else if (choice === "Update Employee Role") {
        updateEmployeeRole();
      } else if (choice === "Update Employee Manager") {
        updateEmployeeManager();
      } else if (choice === "View All Roles") {
        viewAllRoles();
      
      } else if (choice === "Remove Role") {
        removeRole();
      } else {
        endConnection();
      }
    });
}

function peopleUnderAManager(managers) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "teamMembers",
        message: "Select a Manager",
        choices: managers.map((manager) => {
          return `${manager.id}: ${manager.first_name} ${manager.last_name}`;
        }),
      },
    ])
    .then(async (choice) => {
      const selectedManager = choice.teamMembers;
      const selectedManagerId = selectedManager.split(":")[0];
      console.log({ selectedManagerId });
      queryEmployees(selectedManagerId);
    });
}

function addEmployee(managers, roles) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addName",
        message: "What is the new employee's first name?",
      },
      {
        type: "input",
        name: "addLastName",
        message: "What is the new employee's last name?",
      },
      {
        type: "list",
        name: "selectedManager",
        message: "Select a Manager",
        choices: managers.map((manager) => {
          return `${manager.id}: ${manager.first_name} ${manager.last_name}`;
        }),
      },
      {
        type: "list",
        name: "selectedRole",
        message: "Select a Role",
        choices: roles.map((role) => {
          return `${role.id}: ${role.title}`;
        }),
      },
    ])
    .then(async (choice) => {
      //manager id
      const selectedManager = choice.selectedManager;
      const selectedManagerId = selectedManager.split(":")[0];
      //role id
      const selectedRole = choice.selectedRole;
      const selectedRoleId = selectedRole.split(":")[0];
      // call create function with the 4 parameters
      createEmployee(choice.addName, choice.addLastName, selectedRoleId, selectedManagerId);
    });
}

module.exports = {
  startingPrompt,
};
