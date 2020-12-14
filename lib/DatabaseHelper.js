const { sqlIdToDelete } = require("../db/queries");

class DatabaseHelper {
  constructor(name, query, pool, init, promptUser, questions) {
    this.query = query;
    this.pool = pool;
    this.init = init;
    this.promptUser = promptUser;
    this.questions = questions;
    this.name = name;
  }

  async addData(newData) {
    const result = await this.pool.query(this.query, newData);
    console.log(`${result.affectedRows} ${this.name} was updated`);
  }

  async removeData(data) {
    console.log(data);
    const idToDelete = (await this.pool.query(sqlIdToDelete, data.name))[0].id;
    const result = await this.pool.query(this.query, idToDelete);
    console.log(`${result.affectedRows} ${this.name} was removed`);
  }

  async removeDataDb() {
    const userAnswers = await this.promptUser(this.questions);
    await this.removeData(userAnswers);
    await this.init();
  }

  async updateDataDb() {
    const userAnswers = await this.promptUser(this.questions);
    await this.addData(userAnswers);
    await this.init();
  }
}

class AddEmpData extends DatabaseHelper {
  async addData(answers) {
    const newEmployeeData = {
      first_name: answers.firstName,
      last_name: answers.lastName,
      role_id: (await this.pool.query(`SELECT id FROM role WHERE title = ?`, answers.title))[0].id,
      manager_id: (
        await this.pool.query(
          `SELECT id FROM employee WHERE CONCAT(first_name,' ', last_name) = ?`,
          answers.manager
        )
      )[0].id,
    };
    super.addData(newEmployeeData);
  }
}

class UpdateEmpData extends DatabaseHelper {
  // extract role id  and emp id to update in table
  async addData(answers) {
    const newRoleEmp = {
      // wrapping await statements in parentheses in order to extract the promise by accessing index 0 and id property
      title: (await this.pool.query(`SELECT id FROM role WHERE title = ?`, answers.title))[0].id,
      id: (
        await this.pool.query(
          `SELECT id FROM employee WHERE CONCAT(first_name,' ', last_name) = ?`,
          answers.fullName
        )
      )[0].id,
    };
    // object destructuring
    const { title, id } = await newRoleEmp;
    super.addData([title, id]);
  }
}

// add Department
class AddDepData extends DatabaseHelper {
  async addData(answers) {
    const newDepData = {
      name: answers.department,
    };
    super.addData(newDepData);
  }
}

// add Role
class AddRoleData extends DatabaseHelper {
  async addData(answers) {
    try {
      const newRoleData = {
        title: answers.title,
        salary: answers.salary,
        department_id: (
          await this.pool.query(`SELECT id FROM department WHERE name = ?`, answers.departmentName)
        )[0].id,
      };
      super.addData(newRoleData);
    } catch (err) {
      console.log(err.message);
    }
  }
}

// remove employee
class RemoveEmpData extends DatabaseHelper {
  async removeData(data) {
    const empToRemove = {
      name: data.removeEmpName,
    };
    super.removeData(empToRemove);
  }
}
module.exports = { AddEmpData, AddDepData, AddRoleData, UpdateEmpData, RemoveEmpData };
