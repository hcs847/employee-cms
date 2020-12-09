INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 10000, 4),
('Engineering Manager', 20000, 1),
('Lawyer', 12000, 3),
('Accountant', 9000, 2),
('Controller', 18000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('David', 'Jackson', 2, NULL),
('Ruth', 'Maywood', 3, NULL),
('Jane', 'Smith', 5, NULL),
('Jack', 'Davidson', 4, 4);

    