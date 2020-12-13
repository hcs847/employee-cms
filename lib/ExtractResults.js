const updateRowData = class ExtractResults {
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

const addEmpData = class addEmployeData extends updateRowData {
  async addEmployee(employee) {
    const newEmployeeData = {
      first_name: employee.firstName,
      last_name: employee.lastName,
      role_id: (await this.pool.query(`SELECT id FROM role WHERE title = ?`, employee.title))[0].id,
      manager_id: (
        await this.pool.query(
          `SELECT id FROM employee WHERE CONCAT(first_name,' ', last_name) = ?`,
          employee.manager
        )
      )[0].id,
    };
    const result = await this.pool.query(this.query, newEmployeeData);
    console.log(`${result.affectedRows} amployee was added`, newEmployeeData);
  }

  // extract role id  and emp id to update in table
  async getEmpRole(emp) {
    const newRoleEmp = {
      // wrapping await statements in order to extract the promise by accessing index 0 and id property
      title: (await this.pool.query(`SELECT id FROM role WHERE title = ?`, emp.title))[0].id,
      id: (
        await this.pool.query(
          `SELECT id FROM employee WHERE CONCAT(first_name,' ', last_name) = ?`,
          emp.fullName
        )
      )[0].id,
    };
    // object destructuring
    const { title, id } = await newRoleEmp;

    // pass properties as an array to update query
    const result = await this.pool.query(this.query, [title, id]);
    console.log(`${result.affectedRows} employee was updated`);
  }
  // update table with employee's new role
  async updateEmpRole() {
    const userAnswers = await super.getAnswers();
    await this.getEmpRole(userAnswers);
    await this.init();
  }

  // update table with new employee
  async updateEmployee() {
    const userAnswers = await super.getAnswers();
    await this.addEmployee(userAnswers);
    await this.init();
  }
};

const addDepData = class addEmployeData extends updateRowData {
  async addDepartment(department) {
    const newDepartmentData = {
      name: department.department,
    };
    const result = await this.pool.query(this.query, newDepartmentData);
    console.log(`${result.affectedRows} departemnt was added`);
  }
  async updateDepartment() {
    const userAnswers = await super.getAnswers();
    await this.addDepartment(userAnswers);
    await this.init();
  }
};

const addRoleData = class addRoleData extends updateRowData {
  async addRole(role) {
    try {
      const newRoleData = {
        title: role.title,
        salary: role.salary,
        department_id: (
          await this.pool.query(`SELECT id FROM department WHERE name = ?`, role.departmentName)
        )[0].id,
      };

      const result = await this.pool.query(this.query, newRoleData);
      console.log(`${result.affectedRows} role was added`);
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

const removeEmployeeData = class removeEmpData extends updateRowData {
  async removeEmp(emp) {
    const empToDelete = {
      name: emp.removeEmpId,
    };
    const empId = await this.pool.query(
      `SELECT id FROM employee WHERE CONCAT(first_name,' ', last_name) = ?`,
      empToDelete.name
    );
    const result = await this.pool.query(this.query, empId[0].id);
    console.log(`${result.affectedRows} employee was removed`);
  }

  async updateEmp() {
    const userAnswers = await super.getAnswers();
    await this.removeEmp(userAnswers);
    await this.init();
  }
};
module.exports = { addEmpData, addDepData, addRoleData, removeEmployeeData };
