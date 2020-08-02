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

// Array to contain all team members.
let team = [];

// Object to contain all ID numbers.
const ids = {};

// An array containing inquirer questions about the team manager.
const mgrQs = [
  {
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
  }
];

const internQs = [
  {
    type: "input",
    name: "intName",
    message: "Please enter the intern's name.",
    validate: validBlank
  },
  {
    type: "input",
    name: "intId",
    message: "Please enter the intern's ID number.",
    validate: validBlank
  },
  {
    type: "input",
    name: "intEmail",
    message: "Please enter the intern's email address.",
    validate: validEmail
  },
  {
    type: "input",
    name: "intSchool",
    message: "Please enter the name of the intern's school.",
    validate: validBlank
  }
];

const engQs = [
{
  type: "input",
  name: "engName",
  message: "Please enter the engineer's name.",
  validate: validBlank
},
{
  type: "input",
  name: "engId",
  message: "Please enter the engineer's ID number.",
  validate: validBlank
},
{
  type: "input",
  name: "engEmail",
  message: "Please enter the engineer's email address.",
  validate: validEmail
},
{
  type: "input",
  name: "engGit",
  message: "Please enter the engineer's GitHub username.",
  validate: validGit
}
];

// A function to create a manager object based on the Manager class and push it to the team array.
newMgr = () => {
  console.log(`
  *** Welcome to Roster Generator. Let's build your team! ***
  `);
  inquirer.prompt(mgrQs).then(response => {
    const mgr = new Manager(response.mgrName, response.mgrId, response.mgrEmail, response.mgrOffice);
    team.push(mgr);
    ids[response.mgrId] = true;
    console.log(`
    *** ` + response.mgrName + ` has been added to the team! ***
    `);
    newEmp();
  });
};

// A function which prompts the user to select a role for a new team member or finish building the team. When finished, calls the render function and passes it the array of team members.
newEmp = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Please select a role for the next team member.",
      choices: [
        "Intern",
        "Engineer",
        "Finish adding team members."
      ]
    }
  ])
  .then(response => {
    switch(response.role) {
      case "Intern":
        newIntern();
        break;
      case "Engineer":
        newEng();
        break;
      case "Finish adding team members.":
        fs.writeFileSync(outputPath, render(team));
        console.log(`
        *** Your team has been created and written to team.html! ***`);
        break;
    }
  })
};

newIntern = () => {
  console.log(`
  Okay, let's add a new intern to the team.
  `);
  inquirer.prompt(internQs).then(response => {
    const intern = new Intern(response.intName, response.intId, response.intEmail, response.intSchool);
    console.log(`
    *** ` + response.intName + ` has been added to the team! ***
    `);
    team.push(intern);
    ids[response.intId] = true;
    newEmp();
  });
};

newEng = () => {
  console.log(`
  Okay, let's add a new engineer to the team.
  `);
  inquirer.prompt(engQs).then(response => {
    const engineer = new Engineer(response.engName, response.engId, response.engEmail, response.engGit);
    console.log(`
    ***  ` + response.engName + ` has been added to the team! ***
    `);
    team.piush(engineer);
    ids[response.engId] = true;
    newEmp();
  });
};

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

// Confirms that the user entered a valid GitHub username.
async function validGit(value) {
  const queryUrl = `https://api.github.com/users/${value}`;
  try {
   const response = await axios.get(queryUrl);
    if (response.status === 200) return true;
  } catch (error) {
      return "Please enter a valid GitHub Username.";
  };
};

// Call the functions to run the program!
newMgr();

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