const pool = require("./db/database");
const inquirer = require("inquirer");

const initialQuestions = [
  {
    type: "checkbox",
    name: "initial",
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

getData = (selectedOption) => {
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
  }
};

const promptUser = (questions) => {
  return inquirer.prompt(questions);
};

async function init() {
  console.log(`
    ==============================================
     Welcome to Employee Content Managment System
    ==============================================
    `);
  const userAnswers = await promptUser(initialQuestions);
  const dataToDisplay = await getData(...userAnswers.initial);
  return dataToDisplay;
}

init();
