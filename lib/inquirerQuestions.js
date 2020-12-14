const pool = require("../db/database");
const { sqlSelectEmp, sqlDep } = require("../db/queries");

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

const roleQuestion = {
  type: "checkbox",
  name: "title",
  message: "What is the employee’s Role?",
  choices: async function getRoles() {
    const result = await pool.query(`SELECT title FROM role`);
    const roles = await result.map((role) => role.title);
    return roles;
  },
};
const questions = {
  initial: [
    {
      type: "checkbox",
      name: "initial",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
        "Remove an employee",
        "Exit The Application",
      ],
    },
  ],

  newEmp: [
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
    roleQuestion,
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
  ],

  addDep: [
    {
      type: "input",
      name: "department",
      message: "What is the new Department?",
    },
  ],

  addRole: [
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
  ],
  updateEmp: [
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
    roleQuestion,
  ],
  removeEmp: [
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
  ],
};

module.exports = { choices, questions, roleQuestion };
