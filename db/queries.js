const pool = require("./database");

const sqlDep = `SELECT name from department;`;
const sqlRole = `SELECT title from role;`;
const sqlEmployees = `SELECT e1.id , e1.first_name, e1.last_name, role.title, 
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
const sqlRemoveRow = `DELETE FROM ${this.table} WHERE ${this.field} = ?`;

// update role

// remove employee

module.exports = { sqlDep, sqlRole, sqlEmployees, sqlAddRole, sqlAddEmp, sqlRemoveRow, sqlAddDep };
