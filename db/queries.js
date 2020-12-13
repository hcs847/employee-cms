// const pool = require("./database");

const sqlDep = `SELECT id, name from department;`;
const sqlRole = `SELECT title AS job_title, role.id AS role_id, name AS department_name, salary  from role
                    LEFT JOIN department ON role.department_id = department.id
                    ORDER BY job_title DESC;`;
const sqlEmployees = `SELECT e1.id , e1.first_name, e1.last_name, role.title AS job_title, 
                        department.name AS department, 
                        salary, CONCAT(e2.first_name,' ', e2.last_name) AS manager  
                        FROM employee AS e1
                        LEFT JOIN role on e1.role_id = role.id 
                        LEFT JOIN department ON role.department_id =
                        department.id
                        LEFT JOIN employee as e2 ON e1.manager_id = e2.id
                        ORDER BY manager;
                        `;

const sqlAddEmp = `INSERT INTO employee SET ?`;
const sqlAddDep = `INSERT INTO department SET ?`;
const sqlAddRole = `INSERT INTO role SET ?`;
const sqlSelectEmp = `SELECT CONCAT(first_name,' ', last_name) AS fullName  
FROM employee 
ORDER BY fullName;
`;
const sqlRemoveEmp = `DELETE FROM employee WHERE id = ?`;
const sqlUpdateEmpRole = "UPDATE employee SET role_id = ? WHERE id = ?";

// update role

// remove employee

module.exports = {
  sqlDep,
  sqlRole,
  sqlEmployees,
  sqlAddRole,
  sqlAddEmp,
  sqlRemoveEmp,
  sqlSelectEmp,
  sqlAddDep,
  sqlUpdateEmpRole,
};
