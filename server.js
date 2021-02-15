const inquirer = require("inquirer");

// inquirer prompts

// **Build a command-line application that at a minimum allows the user to:

  // 1) Add departments, roles, employees

  // 2) View departments, roles, employees

  // 3) Update employee roles

// **Bonus points if you're able to:

// bonus 1) Update employee managers
// bonus 2) inquirer prompts
inquirer
    .prompt([
      {
        type: "list",
        name: "whatToDo",
        message: "Who is the employee's manager?",
        choices: [
          // come from name input by user
          "", 
          "", 
          ""
        ],
      },
    ])

  // View employees by manager

  // Delete departments, roles, and employees

  // View the total utilized budget of a department -- ie the combined salaries of all employees in that department


  //import controller functions - call after .then