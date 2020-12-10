const pool = require("./db/database");
const inquirer = require("inquirer");

const initialQuestions = [
  {
    type: "checkbox",
    name: "inital",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "exit",
    ],
  },
];

const employeeQuestions = [
  {
    type: "input",
    name: "firstName",
    message: "What is the employee’s First name?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the employee’s Last name?",
  },
  {
    type: "input",
    name: "role",
    message: "What is the employee’s Role?",
  },
  {
    type: "input",
    name: "department",
    message: "What is the employee’s Department?",
  },

  {
    type: "input",
    name: "manager",
    message: "Who is the employee Manager?",
  },
];

getData = (selectedOption) => {
  console.log("selectedOption", selectedOption);
  if (selectedOption === "View all employees") {
    pool.query(
      `SELECT e1.id , e1.first_name, e1.last_name, role.title, 
      department.name AS department, 
      salary, CONCAT(e2.first_name,' ', e2.last_name) AS manager  
      FROM employee AS e1
      LEFT JOIN role on e1.role_id = role.id 
      LEFT JOIN department ON role.department_id =
      department.id
      LEFT JOIN employee as e2 ON e1.manager_id = e2.id
      ORDER BY manager;
      `,
      (err, results, fields) => {
        console.table(results);
      }
    );
    // promptUser(initialQuestions);
  }
  if (selectedOption === "Add an employee") {
    promptUser(employeeQuestions).then((answers) => {
      console.log(answers);
    });
    promptUser(initialQuestions);
  } else if (selectedOption === "exit") {
    pool.end();
    // return;
  }
};

const promptUser = (questions) => {
  return inquirer.prompt(questions);
};

function init() {
  console.log(`
    ==============================================
     Welcome to Employee Content Managment System
    ==============================================
    `);

  promptUser(initialQuestions).then((answers) => getData(...answers.inital));
}

init();
