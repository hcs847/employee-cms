const pool = require("./db/database");
const inquirer = require("inquirer");
const {
  sqlDep,
  sqlEmployees,
  sqlRole,
  sqlAddEmp,
  sqlAddDep,
  sqlAddRole,
  sqlRemoveRow,
} = require("./db/queries");
const DisplayResults = require("./lib/DiaplayResults");
const { addRowData, addEmpData, addDepData, addRoleData } = require("./lib/ExtractResults");

const choices = [
  "View All Departments",
  "View All Roles",
  "View All Employees",
  "Add A Department",
  "Add A Role",
  "Add An Employee",
  "Update An Employee Role",
  "Remove an employee",
  "Exit The Application",
];
const initialQuestions = [
  {
    type: "checkbox",
    name: "initial",
    message: "What would you like to do?",
    choices: choices,
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
    type: "checkbox",
    name: "title",
    message: "What is the employee’s Role?",
    choices: async function getRoles() {
      const result = await pool.query(`SELECT title FROM role`);
      const roles = await result.map((role) => role.title);
      return roles;
    },
  },
  {
    type: "checkbox",
    name: "manager",
    message: "Who is the employee Manager?",
    choices: async function getManager() {
      const result = await pool.query(`SELECT CONCAT(e2.first_name,' ', e2.last_name) AS manager  
      FROM employee AS e1
      INNER JOIN employee as e2 ON e1.manager_id = e2.id
      GROUP BY e1.manager_id;
      `);
      const managers = await result.map((manager) => manager.manager);
      return managers;
    },
  },
];

// add department promps
const addDepQuestion = [
  {
    type: "input",
    name: "department",
    message: "What is the new Department?",
  },
];

const addRoleQuestions = [
  {
    type: "input",
    name: "title",
    message: "What is the role's title?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the role's salary?",
  },
  {
    type: "checkbox",
    name: "departmentName",
    message: "Which department does the role belongs to?",
    choices: async function getDeps() {
      try {
        const result = await pool.query(`SELECT name FROM department`);
        const deps = await result.map((dep) => dep.name);
        return deps;
      } catch (err) {
        console.log(err);
      }
    },
  },
];

getData = (selectedOption, choices) => {
  switch (selectedOption) {
    case choices[0]:
      const departments = new DisplayResults(sqlDep, pool, init);
      departments.viewResults();
      break;

    case choices[1]:
      // viewRoles();
      const roles = new DisplayResults(sqlRole, pool, init);
      roles.viewResults();
      break;

    case choices[2]:
      const employees = new DisplayResults(sqlEmployees, pool, init);
      employees.viewResults();
      break;

    case choices[3]:
      // addDepartment();
      const department = new addDepData(sqlAddDep, pool, init, promptUser, addDepQuestion);
      department.updateDepartment();
      break;
    case choices[4]:
      // addRole();
      const role = new addRoleData(sqlAddRole, pool, init, promptUser, addRoleQuestions);
      role.updateRole();
      break;

    case choices[5]:
      const addEmployeeData = new addEmpData(sqlAddEmp, pool, init, promptUser, employeeQuestions);
      addEmployeeData.updateEmployee();
      break;

    case choices[6]:
      //updateEmployeeRole();
      break;

    case choices[7]:
      //removeEmployee();
      break;

    case choices[8]:
      pool.end();
      break;
  }
};

const promptUser = (questions) => {
  return inquirer.prompt(questions);
};

async function init() {
  console.log(" ");
  try {
    const userAnswers = await promptUser(initialQuestions);
    await getData(...userAnswers.initial, choices);
  } catch (err) {
    console.log(err);
  }
}

console.log(`
  ==============================================
   Welcome to Employee Content Managment System
  ==============================================
  `);
init();

async function getDeps() {
  try {
    const result = await pool.query(`SELECT name FROM department`);
    const deps = await result.map((dep) => dep.name);
    console.log(deps);
  } catch (err) {
    console.log(err);
  }
}
