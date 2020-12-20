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

const viewEmpl = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    runMenu();
  });
};

//ADD FUNCTIONS

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
async function updateEmpl() {
  //query employee table to display all employees as a list of selections to update
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    // console.log(res);
    //map over (iterate through) the array of employees and display them on a table.
    const emplChoices = res.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    // console.log(emplChoices);
    //Ask user to select which employee they want to update from the list of employee. User selects employee by entering the selected employee's ID
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's ID do you want to update?",
          choices: emplChoices,
        },
      ])
      //passing the user's employee ID selection as an answer to a callback function that will
      //initialize another query of the employee table based on the selected employee's id
      .then((answer) => {
        //trying to select the employee's role ID to update based on the employee's ID??
        // const id = answer.id;
        // const emplSelect = id[2];
        console.log(answer);
        const roleQuery = "SELECT ? FROM employee";
        connection.query(
          roleQuery,
          {
            id: answer.employeeID,
          },
          (err, res) => {
            if (err) throw err;
            // console.log(id);
          }
        );
      });
  });
}

// const roles = connection.query("SELECT * FROM role", (err, res) => {
//   if (err) throw err;
//   // console.table(res);
// });

// const roleChoices = roles.map(({ id, title }) => ({
//   name: title,
//   value: id,
// }));

// inquirer
//   .prompt([
//     {
//       type: "list",
//       name: "roleID",
//       message: "Which role do you want to assign the selected employee?",
//       choices: roleChoices,
//     },
//   ])
//   .then((data) => {
//     const query = connection.query(
//       "UPDATE employee SET id = ? WHERE id = ?",
//       (err, res) => {
//         if (err) throw err;
//         console.log(`${res.affectedRows} information updated!`);
//       }
//     );
//   })
//   .catch((err) => {
//     if (err) throw err;
//     console.log(err);
//   });
// runMenu();

//function for add department, roles, employees
//function for viewing dept, roles, employees
//function for updating employee roles
//3 tables (department, role, employee)
