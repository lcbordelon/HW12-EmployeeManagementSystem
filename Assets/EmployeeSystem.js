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
        "Update employees",
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

        case "Update Employee":
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
const updateEmpl = () => {
  const query = connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {
        last_name: "kriz",
      },
      {
        id: 1,
      },
    ],
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} information updated!`);
    }
  );
};

// const multiSearch = () => {
//   const query =
//     "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//   connection.query(query, (err, res) => {
//     if (err) throw err;
//     res.forEach(({ artist }) => console.log(artist));
//     runSearch();
//   });
// };

// const rangeSearch = () => {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//     ])
//     .then((answer) => {
//       const query =
//         "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], (err, res) => {
//         if (err) throw err;
//         res.forEach(({ position, song, artist, year }) =>
//           console.log(
//             `Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`
//           )
//         );
//         runSearch();
//       });
//     });
// };

// const songSearch = () => {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?",
//     })
//     .then((answer) => {
//       console.log(`You searched for "${answer.song}"`);
//       connection.query(
//         "SELECT * FROM top5000 WHERE ?",
//         { song: answer.song },
//         (err, res) => {
//           if (err) throw err;
//           if (res[0]) {
//             console.log(
//               `Position: ${res[0].position} || Song: ${res[0].song} || Artist: ${res[0].artist} || Year: ${res[0].year}`
//             );
//             runSearch();
//           } else {
//             console.error("Song not found :(\n");
//             runSearch();
//           }
//         }
//       );
//     });
// };

//function for add department, roles, employees
//function for viewing dept, roles, employees
//function for updating employee roles
//3 tables (department, role, employee)
