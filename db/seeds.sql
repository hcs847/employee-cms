INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales'),
    ('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 10000, 4),
('Engineering Manager', 20000, 1),
('Lawyer', 12000, 3),
('Accountant', 9000, 2),
('Controller', 18000, 2),
('Director of Sales', 19000, 4),
('VP of Operations', 30000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tom', 'Young', 7, NULL),
('David', 'Jackson', 2, 1),
('Ruth', 'Maywood', 3, 1),
('Jane', 'Smith', 5, 1),
('Jack', 'Davidson', 4, 4),
('James', "Cheng", 6, 1),
('John', 'Doe', 1, 6);

    