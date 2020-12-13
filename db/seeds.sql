INSERT INTO department (name)
VALUES
('CEO'),
('Sales'),
('Legal'),
('Product'),
('Finance'),
('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
('CEO', 1000000, 1),
('VP of Product', 300000, 4),
('General Counsel', 250000, 3),
('Engineering Manager', 180000, 6),
('Director of Sales', 160000, 2),
('Controller', 180000, 5),
('Engineer', 150000, 6),
('Lawyer', 120000, 3),
('Sales Lead', 100000, 2),
('Accountant', 90000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Sam', 'Maddison', 1,NULL),
('Tom', 'Young', 2, 1),
('Ruth', 'Maywood', 3, 1),
('David', 'Jackson', 4, 1),
('Jane', 'Smith', 5, 2),
('Jack', 'Davidson', 6, 1),
('Hima', 'Krishna', 7, 4),
('James', "Cheng", 8, 3),
('Mike', 'Dawn', 9, 5),
('John', 'Doe', 10, 6);

    