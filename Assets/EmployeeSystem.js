const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
// console.log(logo(config).render());

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Ettajames15!",
  database: "employee_systemDB",
});

//SETTING UP INITIAL CONNECTION AND DISPLAYING MENU IF SUCCESSFUL
connection.connect((err) => {
  if (err) throw err;
  runMenu();
});

//MENU FUNCTION
const runMenu = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "Add departments",
        "Add roles",
        "Add employees",
        "Update employee",
        "Exit",
      ],
    })
    //SWITCH CASE TO DIRECT USER BASED ON MENU SELECTION
    .then((answer) => {
      switch (answer.action) {
        case "View departments":
          viewDept();
          break;

        case "View roles":
          viewRole();
          break;

        case "View employees":
          viewEmpl();
          break;

        case "Add departments":
          addDept();
          break;

        case "Add roles":
          addRole();
          break;

        case "Add employees":
          addEmpl();
          break;

        case "Update employee":
          updateEmpl();
          break;

        case "Exit":
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

//VIEW FUNCTIONS
const viewDept = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    runMenu();
  });
};

const viewRole = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    runMenu();
  });
};

const viewEmpl = () => {
  //SELECT LEFT JOIN
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runMenu();
  });
};

//ADD FUNCTIONS

const addDept = () => {
  inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO department SET ?";
      connection.query(
        query,
        {
          department: answer.deptName,
        },
        (err, res) => {
          if (err) throw err;
          runMenu();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "titleName",
        type: "input",
        message: "What is the title of the role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the role's salary?",
      },
      {
        name: "departmentID",
        type: "input",
        message: "What is ID number of the department?",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO role SET ?";
      connection.query(
        query,
        {
          title: answer.titleName,
          salary: answer.salary,
          department_id: answer.departmentID,
        },
        (err, res) => {
          if (err) throw err;
          runMenu();
        }
      );
    });
};

const addEmpl = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the employee's role ID?",
      },
      {
        name: "managerID",
        type: "input",
        message: "What is the employee's manager's ID?",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO employee SET ?";
      connection.query(
        query,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleID,
          manager_id: answer.managerID,
        },
        (err, res) => {
          if (err) throw err;
          runMenu();
        }
      );
    });
};

//UPDATE FUNCTIONS
// Update employee role
const updateEmpl = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "Please enter the employee ID of the employee you would like to change the role of",
        name: "empUpd",
      },
      {
        type: "input",
        message: "Please enter the role ID you would it updated to",
        name: "roleUpdateID",
      },
    ])
    .then((answer) => {
      connection.query(
        `UPDATE employee SET role_id = ${answer.roleUpdateID} WHERE id = ${answer.empUpd}`
      );
      runMenu();
    });
};
