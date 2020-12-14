const pool = require("./db/database");
const inquirer = require("inquirer");
const {
  sqlDep,
  sqlEmployees,
  sqlRole,
  sqlAddEmp,
  sqlAddDep,
  sqlAddRole,
  sqlSelectEmp,
  sqlUpdateEmpRole,
  sqlRemoveEmp,
} = require("./db/queries");

const DisplayResults = require("./lib/DiaplayResults");
const {
  addEmpData,
  addDepData,
  addRoleData,
  updateEmpData,
  removeEmployeeData,
} = require("./lib/ExtractResults");

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
      const result = await pool.query(`SELECT CONCAT(first_name,' ', last_name) AS manager  
      FROM employee;
      `);
      const managers = await result.map((manager) => manager.manager);
      return managers;
    },
  },
];

// department promps
const addDepQuestion = [
  {
    type: "input",
    name: "department",
    message: "What is the new Department?",
  },
];

// add role
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
        const result = await pool.query(sqlDep);
        const deps = await result.map((dep) => dep.name);
        return deps;
      } catch (err) {
        console.log(err);
      }
    },
  },
];

// update an employee
const updateEmplQuestions = [
  {
    type: "checkbox",
    name: "fullName",
    message: "Which employee do you whish to update?",
    choices: async function updateEmployee() {
      const result = await pool.query(sqlSelectEmp);
      const empToDelete = await result.map((emp) => emp.fullName);
      return empToDelete;
    },
  },
  employeeQuestions[2],
];
// remove employee
const reomveEmplQuestions = [
  {
    type: "checkbox",
    name: "removeEmpName",
    message: "Which employee do you whish to remove?",
    choices: async function delEmployee() {
      const result = await pool.query(sqlSelectEmp);
      const empToDelete = await result.map((emp) => emp.fullName);
      return empToDelete;
    },
  },
];

getData = (selectedOption, choices) => {
  switch (selectedOption) {
    // view departments
    case choices[0]:
      const departments = new DisplayResults(sqlDep, pool, init);
      departments.viewResults();
      break;

    // view roles
    case choices[1]:
      const roles = new DisplayResults(sqlRole, pool, init);
      roles.viewResults();
      break;

    // view employees
    case choices[2]:
      const employees = new DisplayResults(sqlEmployees, pool, init);
      employees.viewResults();
      break;
    // add a department
    case choices[3]:
      const department = new addDepData(
        "department",
        sqlAddDep,
        pool,
        init,
        promptUser,
        addDepQuestion
      );
      department.updateDataDb();
      break;

    // add a role
    case choices[4]:
      const role = new addRoleData("role", sqlAddRole, pool, init, promptUser, addRoleQuestions);
      role.updateDataDb();
      break;

    // add an employee
    case choices[5]:
      const addEmployeeData = new addEmpData(
        "employee",
        sqlAddEmp,
        pool,
        init,
        promptUser,
        employeeQuestions
      );
      addEmployeeData.updateDataDb();
      break;

    // update an employee role
    case choices[6]:
      const updateEmpRole = new updateEmpData(
        "employee",
        sqlUpdateEmpRole,
        pool,
        init,
        promptUser,
        updateEmplQuestions
      );
      updateEmpRole.updateDataDb();
      break;

    // remove an employee
    case choices[7]:
      const removeEmpData = new removeEmployeeData(
        "employee",
        sqlRemoveEmp,
        pool,
        init,
        promptUser,
        reomveEmplQuestions
      );
      removeEmpData.removeDataDb();
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
