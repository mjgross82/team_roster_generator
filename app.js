// Dependencies declared in the provided assignment template.
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// An array containing inquirer questions the user will be asked to answer.
const mgrQs = [{
    type: "input",
    name: "mgrName",
    message: "Please enter the manager's name.",
    validate: validBlank
  },
  {
    type: "input",
    name: "mgrId",
    message: "Please enter the manager's ID number.",
    validate: validBlank
  },
  {
    type: "input",
    name: "mgrEmail",
    message: "Please enter the manager's email address.",
    validate: validEmail
  },
  {
    type: "input",
    name: "mgrOffice",
    message: "Please enter the manager's office number.",
    validate: validBlank
  },
  {
    type: "input",
    name: "teamSize",
    message: "How many other members are there on the team?",
    validate: validBlank
  }
];

// Validation check that a required answer has not been left blank.
function validBlank(value) {
  if (value != "") return true;
  else return "This section can not be left blank.";
};

// Confirms that the user entered a valid email address.
function validEmail(value) {
  const addy = /\S+@\S+\.\S+/;
  if (value.match(addy)) return true;
  else return "Please enter a valid email address.";
};

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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