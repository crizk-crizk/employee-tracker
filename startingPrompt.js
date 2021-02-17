const inquirer = require("inquirer");

const {
  getAllRecords,
  endConnection,
  queryManagers,
  queryEmployees,
  createEmployee,
  createRole,
  updateEmployeeById
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
          
          //working on:
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
        await getAllRecords("department", true);
        quitOrContinue();
      } else if (choice.whatToDo === "View Employees") {
        await getAllRecords("employee", true);
        quitOrContinue();
      } else if (choice.whatToDo === "View Roles") {
        await getAllRecords("role", true);
        quitOrContinue();
      } else if (choice.whatToDo === "View Employees By Manager") {
        const managers = await queryManagers();
        const result = Object.values(JSON.parse(JSON.stringify(managers)));
        //console.log(result);
        peopleUnderAManager(result);

      } else if (choice.whatToDo === "Add Employee") {
        const managers = await queryManagers();
        const result = Object.values(JSON.parse(JSON.stringify(managers)));
        //console.log(result);
        const roles = await getAllRecords("role", false);
        const roleResult = Object.values(JSON.parse(JSON.stringify(roles)));
        addEmployee(result, roleResult);
        

      } else if (choice.whatToDo === "Add Role") {
        const department = await getAllRecords("department", false);
        const departmentResult = Object.values(JSON.parse(JSON.stringify(department)));
        addRole(departmentResult);


      } else if (choice.whatToDo === "Update Employee Role") {
        const allEmployees = await getAllRecords("employee", false);
        const employeeResult = Object.values(JSON.parse(JSON.stringify(allEmployees)));
        //console.log(result);
        const roles = await getAllRecords("role", false);
        const roleResult = Object.values(JSON.parse(JSON.stringify(roles)));

        updateEmployeeRole(employeeResult, roleResult);



      } else if (choice === "Remove Employee") {
        removeEmployee();
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
      //console.log({ selectedManagerId });
      await queryEmployees(selectedManagerId);
      quitOrContinue();
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
      await createEmployee(
        choice.addName,
        choice.addLastName,
        selectedRoleId,
        selectedManagerId
      );
      console.log(`employee added!`);
      quitOrContinue();
    });
}

function addRole(departments) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role title?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the role's salary?",
      },
      {
        type: "list",
        name: "selectedDepartment",
        message: "Select a Department",
        choices: departments.map((department) => {
          return `${department.id}: ${department.name} `;
        }),
      },
    ])
    .then(async (choice) => {
      //manager id
      const selectedDepartment = choice.selectedDepartment;
      const selectedDepartmentId = selectedDepartment.split(":")[0];
      // call create function with the 4 parameters
      await createRole(
        choice.title,
        choice.salary,
        selectedDepartmentId
      );
      console.log(`Role Added!`);
      quitOrContinue();
    });
}


function updateEmployeeRole(employeesParam, rolesParam) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selectedEmployee",
        message: "Select an Employee to update their role",
        choices: employeesParam.map((employee) => {
          return `${employee.id}: ${employee.first_name} ${employee.last_name}`;
        }),
      },
      {
        type: "list",
        name: "selectedRole",
        message: "Select the New Role",
        choices: rolesParam.map((role) => {
          return `${role.id}: ${role.title}`;
        }),
      },
    ])
    .then(async (choice) => {
      //employee id
      const selectedEmployee = choice.selectedEmployee;
      const selectedEmployeeId = selectedEmployee.split(":")[0];
      //role id
      const selectedRole = choice.selectedRole;
      const selectedRoleId = selectedRole.split(":")[0];
      // call create function with the 4 parameters
      await updateEmployeeById(
        selectedRoleId,
        selectedEmployeeId
      );
      console.log(`Role Updated!`);
      quitOrContinue();
    });
}



function quitOrContinue() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "quitOr",
        message: "What would you like to do next?",
        choices: ["Go back to main menu", "Exit"],
      },
    ])
    .then((choice) => {
      if (choice.quitOr === "Go back to main menu") {
        startingPrompt();
      } else {
        endConnection();
      }
    });
}



module.exports = {
  startingPrompt,
};
