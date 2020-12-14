const pool = require("./db/database");
const inquirer = require("inquirer");
const { choices, questions } = require("./lib/inquirerQuestions");
const {
  sqlDep,
  sqlEmployees,
  sqlRole,
  sqlAddEmp,
  sqlAddDep,
  sqlAddRole,
  sqlUpdateEmpRole,
  sqlRemoveEmp,
} = require("./db/queries");

const SelectReports = require("./lib/SelectReports");
const {
  AddEmpData,
  AddDepData,
  AddRoleData,
  UpdateEmpData,
  RemoveEmpData,
} = require("./lib/DatabaseHelper");

getData = (selectedOption, choices) => {
  switch (selectedOption) {
    // view departments
    case choices[0]:
      const departments = new SelectReports(sqlDep, pool, init);
      departments.viewResults();
      break;

    // view roles
    case choices[1]:
      const roles = new SelectReports(sqlRole, pool, init);
      roles.viewResults();
      break;

    // view employees
    case choices[2]:
      const employees = new SelectReports(sqlEmployees, pool, init);
      employees.viewResults();
      break;
    // add a department
    case choices[3]:
      const department = new AddDepData(
        "department",
        sqlAddDep,
        pool,
        init,
        promptUser,
        questions.addDep
      );
      department.updateDataDb();
      break;

    // add a role
    case choices[4]:
      const role = new AddRoleData("role", sqlAddRole, pool, init, promptUser, questions.addRole);
      role.updateDataDb();
      break;

    // add an employee
    case choices[5]:
      const addEmployeeData = new AddEmpData(
        "employee",
        sqlAddEmp,
        pool,
        init,
        promptUser,
        questions.newEmp
      );
      addEmployeeData.updateDataDb();
      break;

    // update an employee role
    case choices[6]:
      const updateEmpRole = new UpdateEmpData(
        "employee",
        sqlUpdateEmpRole,
        pool,
        init,
        promptUser,
        questions.updateEmp
      );
      updateEmpRole.updateDataDb();
      break;

    // remove an employee
    case choices[7]:
      const removeEmpData = new RemoveEmpData(
        "employee",
        sqlRemoveEmp,
        pool,
        init,
        promptUser,
        questions.removeEmp
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
    const userAnswers = await promptUser(questions.initial);
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
