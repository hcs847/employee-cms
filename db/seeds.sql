INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales'),
    ('Product'),
    ('CEO');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 10000, 4),
('Engineering Manager', 20000, 1),
('Lawyer', 12000, 3),
('Accountant', 9000, 2),
('Controller', 18000, 2),
('Director of Sales', 19000, 4),
('VP of Product', 30000, 5),
('General Counsel', 30000, 3),
('CEO', 100000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Sam', 'Maddison', 9,NULL),
('Tom', 'Young', 7, 1),
('David', 'Jackson', 2, 2),
('Ruth', 'Maywood', 3, 2),
('Jane', 'Smith', 5, 2),
('Jack', 'Davidson', 4, 5),
('James', "Cheng", 6, 2),
('Mike', 'Dawn', 8, 1),
('John', 'Doe', 1, 7);


    