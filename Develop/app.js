const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");


var role = "";
var name = "";
var id = 0;
var email = "";
var additionalInfo = "";
var employeeArray = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,

function aboutEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the employee's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the employee's email?",
        name: "email",
      },
    ])
    .then((data) => {
      role = data.role;
      name = data.name;
      id = data.id;
      email = data.email;

      if (data.role == "Manager") {
        inquirer
          .prompt({
            message: "What is the manager's office number?",
            name: "officeNumber",
          })
          .then((data2) => {
            additionalInfo = data2.officeNumber;
            createEmployee(role, name, id, email, additionalInfo);
          });
      } else if (data.role == "Engineer") {
        inquirer
          .prompt({
            message: "What is the engineer's GitHub username?",
            name: "github",
          })
          .then((data2) => {
            additionalInfo = data2.github;
            createEmployee(role, name, id, email, additionalInfo);
          });
      } else if (data.role == "Intern") {
        inquirer
          .prompt({
            message: "What is the intern's school?",
            name: "school",
          })
          .then((data2) => {
            additionalInfo = data2.school;
            createEmployee(role, name, id, email, additionalInfo);
          });
      }
    });
}
// and to create objects for each team member (using the correct classes as blueprints!)

function createEmployee(role, name, id, email, additional) {
  if (role == "Manager") {
    const newManager = new Manager(name, id, email, additional);
    addEmployee(newManager);
    return newManager;
  } else if (role == "Engineer") {
    const newEngineer = new Engineer(name, id, email, additional);
    addEmployee(newEngineer);
    return newEngineer;
  } else {
    const newIntern = new Intern(name, id, email, additional);
    addEmployee(newIntern);
    return newIntern;
  }
}

function addEmployee(employee) {
  employeeArray.push(employee);
  console.log(employeeArray);
  initiate();
}

function initiate() {
  inquirer
    .prompt({
      message: "Would you like to add a team member?",
      type: "list",
      name: "repeat",
      choices: ["Yes", "No"],
    })
    .then((data) => {
      if (data.repeat === "Yes") {
        aboutEmployee();
      } else {
        console.log("All done");
        return writeFileAsync(outputPath,render(employeeArray));
      }
    });
}

initiate();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
