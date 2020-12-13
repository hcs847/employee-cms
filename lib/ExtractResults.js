const pool = require("../db/database");

const addRowData = class ExtractResults {
  constructor(query, pool, init, promptUser, questions) {
    this.query = query;
    this.pool = pool;
    this.init = init;
    this.promptUser = promptUser;
    this.questions = questions;
  }

  async getAnswers() {
    const userAnswers = await this.promptUser(this.questions);
    return userAnswers;
  }
};

const addEmpData = class addEmployeData extends addRowData {
  async addEmployee(employee) {
    const newEmployeeData = {
      first_name: employee.firstName,
      last_name: employee.lastName,
      role_id: (await this.pool.query(`SELECT id FROM role WHERE title = ?`, employee.title))[0].id,
      manager_id: (
        await this.pool.query(
          `SELECT  e2.id  
                          FROM employee AS e1
                          INNER JOIN employee as e2 ON e1.manager_id = e2.id
                          WHERE CONCAT(e2.first_name,' ', e2.last_name) = ?
                          GROUP BY e2.id;
                          `,
          employee.manager
        )
      )[0].id,
    };
    const result = await this.pool.query(this.query, newEmployeeData);
    return result[0];
  }
  async updateEmployee() {
    const userAnswers = await super.getAnswers();
    await this.addEmployee(userAnswers);
    await this.init();
  }
};

const addDepData = class addEmployeData extends addRowData {
  async addDepartment(department) {
    const newDepartmentData = {
      name: department.department,
    };
    const result = await this.pool.query(this.query, newDepartmentData);
    return result[0];
  }
  async updateDepartment() {
    const userAnswers = await super.getAnswers();
    await this.addDepartment(userAnswers);
    await this.init();
  }
};

const addRoleData = class addRoleData extends addRowData {
  async addRole(role) {
    try {
      const newRoleData = {
        title: role.title,
        salary: role.salary,
        department_id: (
          await this.pool.query(`SELECT id FROM department WHERE name = ?`, role.departmentName)
        )[0].id,
      };
      console.log(role);
      const result = await this.pool.query(this.query, newRoleData);
      return result[0];
    } catch (err) {
      console.log(err.message);
    }
  }
  async updateRole() {
    const userAnswers = await super.getAnswers();
    await this.addRole(userAnswers);
    await this.init();
  }
};
module.exports = { addEmpData, addDepData, addRoleData };
